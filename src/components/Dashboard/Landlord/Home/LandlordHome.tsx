import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Home,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";

const mockData = {
  stats: {
    totalProperties: 12,
    totalTenants: 28,
    monthlyRevenue: 24500,
    occupancyRate: 92,
  },
  recentActivity: [
    {
      id: 1,
      type: "payment",
      message: "Rent payment received from John Doe",
      amount: "$2,800",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      type: "inquiry",
      message: "New inquiry for Downtown Apartment",
      time: "4 hours ago",
      status: "pending",
    },
    {
      id: 3,
      type: "maintenance",
      message: "Maintenance request submitted",
      time: "1 day ago",
      status: "warning",
    },
    {
      id: 4,
      type: "lease",
      message: "Lease renewal signed by Sarah Johnson",
      time: "2 days ago",
      status: "success",
    },
  ],
  properties: [
    {
      id: 1,
      name: "Downtown Apartment",
      address: "123 Main St, Seattle, WA",
      type: "Apartment",
      rent: 2800,
      tenant: "John Doe",
      status: "occupied",
      image: "/modern-apartment-living-room.png",
      occupancy: 100,
    },
    {
      id: 2,
      name: "Suburban House",
      address: "456 Oak Ave, Portland, OR",
      type: "House",
      rent: 3200,
      tenant: "Sarah Johnson",
      status: "occupied",
      image: "/city-view-bedroom.png",
      occupancy: 100,
    },
    {
      id: 3,
      name: "City Studio",
      address: "789 Pine St, San Francisco, CA",
      type: "Studio",
      rent: 2100,
      tenant: null,
      status: "vacant",
      image: "/apartment-kitchen-island.png",
      occupancy: 0,
    },
  ],
  upcomingPayments: [
    {
      tenant: "John Doe",
      property: "Downtown Apartment",
      amount: 2800,
      dueDate: "Dec 1, 2024",
      status: "pending",
    },
    {
      tenant: "Sarah Johnson",
      property: "Suburban House",
      amount: 3200,
      dueDate: "Dec 1, 2024",
      status: "paid",
    },
    {
      tenant: "Mike Wilson",
      property: "Lakeside Condo",
      amount: 2500,
      dueDate: "Dec 3, 2024",
      status: "overdue",
    },
  ],
  messages: [
    {
      id: 1,
      from: "John Doe",
      subject: "Heating issue in apartment",
      preview: "The heating system seems to be making unusual noises...",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 2,
      from: "Sarah Johnson",
      subject: "Lease renewal question",
      preview: "I wanted to discuss the terms for lease renewal...",
      time: "3 hours ago",
      unread: true,
    },
    {
      id: 3,
      from: "Property Inquiry",
      subject: "Interest in City Studio",
      preview: "I'm interested in viewing the studio apartment...",
      time: "5 hours ago",
      unread: false,
    },
  ],
};

const LandlordHome = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
      case "paid":
      case "occupied":
        return "bg-green-100 text-green-700";
      case "warning":
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "error":
      case "overdue":
        return "bg-red-100 text-red-700";
      case "vacant":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "warning":
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "error":
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAE0] to-[#B1AB86]/20">
      <main className="p-4 lg:p-6">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-[#B1AB86]/30 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#819067] text-sm font-medium">
                      Total Properties
                    </p>
                    <p className="text-3xl font-bold text-[#0A400C]">
                      {mockData.stats.totalProperties}
                    </p>
                  </div>
                  <div className="p-3 bg-[#819067]/10 rounded-full">
                    <Home className="w-6 h-6 text-[#819067]" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">+2</span>
                  <span className="text-[#819067] ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#B1AB86]/30 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#819067] text-sm font-medium">
                      Total Tenants
                    </p>
                    <p className="text-3xl font-bold text-[#0A400C]">
                      {mockData.stats.totalTenants}
                    </p>
                  </div>
                  <div className="p-3 bg-[#0A400C]/10 rounded-full">
                    <Users className="w-6 h-6 text-[#0A400C]" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">+5</span>
                  <span className="text-[#819067] ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#B1AB86]/30 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#819067] text-sm font-medium">
                      Monthly Revenue
                    </p>
                    <p className="text-3xl font-bold text-[#0A400C]">
                      ${mockData.stats.monthlyRevenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">+12%</span>
                  <span className="text-[#819067] ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#B1AB86]/30 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#819067] text-sm font-medium">
                      Occupancy Rate
                    </p>
                    <p className="text-3xl font-bold text-[#0A400C]">
                      {mockData.stats.occupancyRate}%
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  {/* <Progress value={mockData.stats.occupancyRate} className="h-2" /> */}
                  Here will be a progress bar
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card className="border-[#B1AB86]/30 bg-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-[#0A400C]">
                    Recent Activity
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-[#819067]">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-4">
                    {mockData.recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 p-4 rounded-lg bg-[#FEFAE0]/30"
                      >
                        <div
                          className={`p-2 rounded-full ${getStatusColor(
                            activity.status
                          )}`}
                        >
                          {getStatusIcon(activity.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#0A400C] font-medium">
                            {activity.message}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[#819067] text-sm">
                              {activity.time}
                            </span>
                            {activity.amount && (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                {activity.amount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Upcoming Payments */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-[#B1AB86]/30 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#0A400C]">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    <Button className="w-full bg-[#819067] hover:bg-[#0A400C] text-white justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Property
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white justify-start bg-transparent"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Add New Tenant
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white justify-start bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Payments */}
              <Card className="border-[#B1AB86]/30 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#0A400C]">
                    Upcoming Payments
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    {mockData.upcomingPayments.map((payment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#FEFAE0]/30"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-[#0A400C] font-medium text-sm">
                            {payment.tenant}
                          </p>
                          <p className="text-[#819067] text-xs">
                            {payment.dueDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#0A400C] font-semibold text-sm">
                            ${payment.amount.toLocaleString()}
                          </p>
                          <Badge
                            className={`text-xs ${getStatusColor(
                              payment.status
                            )}`}
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandlordHome;
