import type { LoginResponse } from "@/api/models/login/LoginResponse";

export default class Storage {
  private static loginResponse?: LoginResponse

  public static setLoginResponse(loginResponse: LoginResponse): void {
    this.loginResponse = loginResponse
  }


  public static getToken(): string {
    return this.loginResponse?.data.token ?? ''
  }

  public static getAdminId(): string {
    return this.loginResponse?.data.adminData._id ?? ''
  }

  public static getAdminName(): string {
    return this.loginResponse?.data?.adminData.name ?? ''
  }

  public static getAdminRole(): string {
    return this.loginResponse?.data?.adminData.role ?? ''
  }

  public static getAdminEmail(): string {
    return this.loginResponse?.data.adminData.email ?? ''
  }

  public static getCreatedAt(): number | null {
    return this.loginResponse?.data.adminData.createdAt ?? null
  }

  public static getUpdatedAt(): number | null {
    return this.loginResponse?.data.adminData.updatedAt ?? null
  }

  public static clearData(): void {
    this.loginResponse = undefined
  }
}
