const models = require("../models");

class GeneralTrade {
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

      const buy_total = buy_price / buy_quantity;
      const sell_total = sell_price / sell_quantity;
      const total_entry_price = buy_total * buy_quantity;
      const total_exit_price = sell_total * sell_quantity;

      let return_price;
      if (total_entry_price < total_exit_price) {
        return_price = total_exit_price - total_entry_price;
      } else {
        return_price = total_exit_price - total_entry_price;
      }

      const newTrade = await models.general_trades.create({
        user_id,
        market,
        symbol,
        trade_type,
        trade_items: trade_items,
        entry_price: buy_total,
        exit_price: sell_total,
        total_entry_price: total_entry_price,
        total_exit_price: total_exit_price,
        return_price: return_price,
        buy_quantity: buy_quantity,
        sell_quantity: sell_quantity,
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

  async get_all_trades(req, res) {
    try {
      const { id } = req.params;
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
      });
    } catch (error) {
      console.log(error);
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
