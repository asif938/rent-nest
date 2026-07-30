export const queryKeys = {
  auth: ["auth"],

  properties: ["properties"],

  property: (id: string) => ["property", id],

  categories: ["categories"],

  rentals: ["rentals"],

  landlordRequests: ["landlord-requests"],

  payments: ["payments"],

  payment: (id: string) => ["payment", id],

  reviews: (propertyId: string) => ["reviews", propertyId],

  adminUsers: ["admin-users"],

  adminProperties: ["admin-properties"],

  adminRentals: ["admin-rentals"],

  landlordDashboard: ["landlord-dashboard"],

  tenantDashboard: ["tenant-dashboard"],

  adminDashboard: ["admin-dashboard"],
} as const;