import { baseUrl } from "@/config";
import { APIResponseType, PaginatedAccountResponseType } from "@/types/shared";
import axios from "axios";

export class AccountService {
  private _token?: string | null;

  constructor(token?: string | null) {
    this._token = token;
  }

  async getAccounts(page = 1, size = 10) {
    const response = await axios.get<
      APIResponseType<PaginatedAccountResponseType>
    >(`${baseUrl}/account/view/all?size=${size}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    });
    return response.data;
  }
}
