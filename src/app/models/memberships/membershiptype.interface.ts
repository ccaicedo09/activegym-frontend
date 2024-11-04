export interface MembershipType {
  id: number;
  name: String;
  price: number;
  duration: number;
  description: string;
  isTransferable: boolean;
  isFreezable: boolean;
  isVisible: boolean;
}
