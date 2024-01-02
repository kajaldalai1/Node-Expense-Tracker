const User = require("../models/user");
const sequelize = require("sequelize");
const Expense = require("../models/expense");

const getUserLeaderBoard = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("sum", sequelize.col("expenses.amount")), "total_cost"],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["user.id"],
      order: [["totalExpense", "DESC"]],
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// const getUserLeaderBoard = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     const expenses = await Expense.findAll();
//     const userAggregatedExpenses = {};

//     expenses.forEach((expense) => {
//       if (userAggregatedExpenses[expense.userId]) {
//         userAggregatedExpenses[expense.userId] += expense.amount;
//       } else {
//         userAggregatedExpenses[expense.userId] = expense.amount;
//       }
//     });

//     const UserLeaderBoardDetails = [];
//     users.forEach((user) => {
//       UserLeaderBoardDetails.push({
//         name: user.name,
//         total_cost: userAggregatedExpenses[user.id] || 0,
//       });
//     });

//     UserLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost);
//     res.status(200).json(UserLeaderBoardDetails);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// };

module.exports = {
  getUserLeaderBoard,
};