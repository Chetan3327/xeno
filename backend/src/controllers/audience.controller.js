import Customer from "../models/customer.model.js";
import { getFilterFn } from "../utils/ai.js";

export const getAudience = async (req, res) => {
  try {
    const { query } = req.body;

    const customers = await Customer.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customerId",
          as: "orders",
        },
      },
      {
        $addFields: {
          spent: { $sum: "$orders.amount" },
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          visits: 1,
          lastVisit: 1,
          spent: 1,
        },
      },
    ]); 
    
    console.log(customers)

    console.log(query);

    const filterFn = await getFilterFn(query)
    const filtered = customers.filter(filterFn);
    console.log(filtered)
    
    res.status(202).json({ customers: filtered });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
