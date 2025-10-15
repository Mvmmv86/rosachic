export class PaymentWebhookDto {
  id?: number;
  live_mode?: boolean;
  type?: string;
  date_created?: string;
  user_id?: number;
  api_version?: string;
  action?: string;
  data?: {
    id: string;
  };
}

export class PaymentNotificationDto {
  id: string;
  status: string;
  status_detail?: string;
  payment_method_id?: string;
  payment_type_id?: string;
  transaction_amount?: number;
  transaction_amount_refunded?: number;
  net_received_amount?: number;
  fee_details?: Array<{
    type: string;
    amount: number;
  }>;
  payer?: {
    email?: string;
    identification?: {
      type?: string;
      number?: string;
    };
    first_name?: string;
    last_name?: string;
  };
  external_reference?: string;
  description?: string;
  date_approved?: string;
  date_created?: string;
  date_last_updated?: string;
  money_release_date?: string;
  point_of_interaction?: {
    transaction_data?: {
      qr_code?: string;
      qr_code_base64?: string;
      ticket_url?: string;
    };
  };
}