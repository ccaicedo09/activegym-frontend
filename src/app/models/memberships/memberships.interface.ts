export interface Membership {
  id: number;
  userDocument: number;
  membershipTypeName: string;
  startDate: string;
  endDate: string;
  saleDate: string;
  membershipStatus: string;
  soldByDocument: number;
  paidAmount: number;
}
