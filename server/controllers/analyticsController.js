import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';
import Registration from '../models/Registration.js';
import User from '../models/User.js';

export const getPlatformAnalytics = asyncHandler(async (req, res) => {
  const [summary, categoryPopularity, monthlyGrowth, attendanceChart, revenueChart] = await Promise.all([
    Promise.all([
      Event.countDocuments(),
      User.countDocuments(),
      Registration.countDocuments(),
      Registration.countDocuments({ status: 'attended' })
    ]),
    Event.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      {
        $group: {
          _id: '$category.name',
          totalEvents: { $sum: 1 },
          registrations: { $sum: '$registeredCount' }
        }
      },
      { $sort: { registrations: -1 } }
    ]),
    Registration.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          registrations: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    Registration.aggregate([
      {
        $group: {
          _id: '$status',
          total: { $sum: 1 }
        }
      }
    ]),
    Event.aggregate([
      {
        $group: {
          _id: { $month: '$startsAt' },
          revenue: { $sum: { $multiply: ['$price', '$registeredCount'] } }
        }
      },
      { $sort: { _id: 1 } }
    ])
  ]);

  const [totalEvents, totalUsers, totalRegistrations, totalAttendance] = summary;

  res.json({
    success: true,
    metrics: {
      totalEvents,
      totalUsers,
      totalRegistrations,
      totalAttendance
    },
    categoryPopularity,
    monthlyGrowth,
    attendanceChart,
    revenueChart
  });
});
