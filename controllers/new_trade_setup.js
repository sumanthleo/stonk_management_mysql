const models = require("../models");

class TradeSetup {
  async create_trade_setup(req, res) {
    try {
      const {
        trade_type,
        market,
        symbol,
        trade_entry_price,
        trade_target_price,
        stop_loss_price,
        note,
        trades_tags,
      } = req.body;

      if (
        !trade_type ||
        !market ||
        !symbol ||
        !trade_entry_price ||
        !trade_target_price ||
        !stop_loss_price ||
        !note ||
        !trades_tags
      ) {
        throw new Error(" You must provide all the details ");
      }

      const trade_setup = await models.new_trade_setups.create({
        trade_type,
        market,
        symbol,
        trade_entry_price,
        trade_target_price,
        stop_loss_price,
        note,
        trades_tags,
      });

      res.json({
        status: 200,
        data: trade_setup,
        message: "Trade setup created",
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
module.exports = new TradeSetup();
