import { ProfileType } from ".";

export type AccountType = {
  id: string;
  TransactionTrackingRef: string;
  AccountOpeningTrackingRef: string;
  ProductCode: string;
  customerNumber: string;
  accountNumber: string;
  accountStatus: string;
  accountMessage: string;
  status: boolean;
  HasSufficientInfoOnAccountInfo: boolean;
  AccountInformationSource: number;
  OtherAccountInformationSource: string;
  AccountOfficerCode: string;
  NotificationPreference: string;
  TransactionPermission: string;
  AccountTier: number;
  createdAt: string;
  updatedAt: string;
  profile: ProfileType;
};
