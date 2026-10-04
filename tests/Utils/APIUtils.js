class APIUtils {
  constructor(loginPayload, ApiContext) {
    this.loginPayload = loginPayload;
    this.ApiContext = ApiContext;
  }

  async getToken() {
    const response = await this.ApiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      },
    );
    
    const responseBody = await response.json();
    const token = responseBody.token;
    const userId = responseBody.userId;
    console.log(userId);
    console.log(token);
    return token;
  }

  async createOrder(orderPayload) {
    let response = {};
    response.token = await this.getToken();

    const OrderResponse = await this.ApiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      },
    );
    const orderResponseBody = await OrderResponse.json();
    response.order_id = orderResponseBody.orders[0];
    return response;
  }
}
module.exports = { APIUtils };
