const models = require("../models");

class GeneralTrade {
  /**
   * @api {put} /v1/auth/create_trade
   * @apiName crate trade
   *
   * @apiParam {String} crating a trade with total_entry_price and total_exit_price
   * @apiParam {String} status is win or loss
   * @apiParam {String} added buy_quantity and sell_quantity
   *
   * @apiSuccessExample {json} Success-Response:
   * {}
   */

  async createTrade(req, res) {
    try {
      const { user_id, market, symbol, trade_type, trade_items } = req.body;
      if (
        !user_id ||
        !market ||
        !symbol ||
        !trade_type ||
        (typeof trade_items !== "array" && !trade_items.length)
      ) {
        throw new Error("please provide all details");
      }

      const user = await models.users.findOne({ where: { id: user_id } });
      if (!user) {
        throw new Error("user not found");
      }

      let buy_price = trade_items
        .filter((item) => item.action === "BUY")
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

      let sell_price = trade_items
        .filter((item) => item.action === "SELL")
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

      let buy_quantity = trade_items
        .filter((item) => item.action === "BUY")
        .reduce((sum, item) => sum + item.quantity, 0);

      let sell_quantity = trade_items
        .filter((item) => item.action === "SELL")
        .reduce((sum, item) => sum + item.quantity, 0);

      let total_fee = trade_items
        .map((item) => item)
        .reduce((sum, item) => sum + item.fee, 0);

      const buy_total = buy_price / buy_quantity;
      const sell_total = sell_price / sell_quantity;
      const total_entry_price = buy_total * buy_quantity;
      const total_exit_price = sell_total * sell_quantity;
      const balance_quantity = buy_quantity - sell_quantity;

      let return_price;
      if (total_entry_price > total_exit_price) {
        return_price = total_exit_price - total_entry_price + total_fee;
      } else {
        return_price = total_exit_price - total_entry_price - total_fee;
      }

      const total_return_percentage = (return_price / total_entry_price) * 100;

      let status;
      if (return_price === 0) {
        status = "OPEN";
      } else if (return_price < 0) {
        status = "LOSS";
      } else {
        status = "WIN";
      }

      const newTrade = await models.general_trades.create({
        user_id,
        market,
        symbol,
        trade_type,
        trade_items: trade_items,
        entry_price: buy_total.toFixed(2),
        exit_price: sell_total.toFixed(2),
        total_entry_price: total_entry_price,
        total_exit_price: total_exit_price,
        return_price: return_price,
        buy_quantity: buy_quantity,
        sell_quantity: sell_quantity,
        fee: total_fee,
        return_percentage: total_return_percentage.toFixed(3),
        position: balance_quantity,
        status: status,
      });
      res.json({
        status: 200,
        data: newTrade,
        message: "Trade created successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Something went wrong",
      });
    }
  }

  /**
   * @api {put} /v1/auth/get_trades
   * @apiName get all the trades
   *
   * @apiParam {String} getting all the tardes with their properties
   * @apiParam {String} status is win or loss
   * @apiParam {String} added buy_quantity and sell_quantity
   * 
   * @apiSuccessExample {json} Success-Response:
   * {{
            "market": "STOCK",
            "symbol": "POWER",
            "trade_type": "LONG",
            "entry_price": 1000,
            "exit_price": 1100,
            "total_entry_price": 11000,
            "total_exit_price": 12100,
            "return_price": 1055,
            "buy_quantity": 11,
            "sell_quantity": 11,
            "fee": 45,
            "return_percentage": 9.591,
            "position": 0,
            "status": "won"
        },}
   */
  async get_all_trades(req, res) {
    try {
      const id = req.user.id;
      if (!id) {
        throw new Error("Invalid id");
      }
      const trades = await models.general_trades.findAll({
        where: {
          user_id: id,
        },
        attributes: {
          exclude: [
            "id",
            "user_id",
            "trade_items",
            "is_active",
            "createdAt",
            "updatedAt",
            "_deleted",
          ],
        },
        order: [["createdAt", "Desc"]],
      });
      res.json({
        status: 200,
        data: trades,
        message: "Trades fetched successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Something went wrong",
      });
    }
  }

  /**
   * @api {put} /v1/auth/get_avg_trades
   * @apiName get all the trades avg_wins
   *
   * @apiParam {String} getting all the tardes with their win and losses properties
   * @apiParam {String} status is win or loss
   * @apiParam {String} calculating the win and loss avgs
   *
   * @apiSuccessExample {json} Success-Response:
   * {      "status": "WIN",
            "return_price": 1055,
            "total_avg": 1055,
            "count": 2
      }
   */

  async get_trade_avgs(req, res) {
    try {
      const id = req.user.id;
      if (!id) {
        throw new Error("Invalid id");
      }
      const trades = await models.general_trades.findAll({
        where: {
          user_id: id,
        },
        attributes: [
          "status",
          "return_price",
          [
            models.sequelize.fn("AVG", models.sequelize.col("return_price")),
            "total_avg",
          ],
          [
            models.sequelize.fn("COUNT", models.sequelize.col("status")),
            "count",
          ],
        ],
        group: ["status"],
        raw: true,
        order: [["createdAt", "Desc"]],
      });
      res.json({
        status: 200,
        data: trades,
        message: "Trades fetched successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Something went wrong",
      });
    }
  }
}
module.exports = new GeneralTrade();
