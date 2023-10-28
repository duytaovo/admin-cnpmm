import { CheckCircleFill } from "react-bootstrap-icons";

import "./table.scss";
import numberWithCommas from "src/utils/numberWithCommas";

function OrderDetail(props: any) {
  const { customer } = props;
  const orderItems = props.order_items.data;

  const deliveryTime = "3/8/2023";
  const amountPaid = props.totalPrice;
  const surcharge = 20000;
  const style = (text: string) => {
    switch (text) {
      case "Đã đặt hàng":
      case "Đặt hàng":
        return "text-green-400";
      case "Đang giao hàng":
        return "text-blue-400";
      case "Đã hủy":
        return "text-red-400";
      case "Đã nhận":
        return "text-gray-400";
    }
  };

  return (
    <div>
      <div className="p-8 border-b">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">Chi tiết đơn hàng: #{props.id}</h2>
          <p className="text-xl">
            Trạng thái:{" "}
            <span className={style(props.status)}>{props.status}</span>{" "}
          </p>
        </div>
        <p className="text-xl">Mua tại thegioicongnghe.com</p>
      </div>
      {orderItems.map((item: any) => {
        return (
          <div className="flex justify-between py-4 border-b">
            <div className="flex">
              <div className="w-40 h-56">
                <img className="object-cover" src={item.img} alt={item.title} />
              </div>
              <div>
                <p className="font-semibold text-xl">{item.title}</p>
                <p className="text-left">Màu: {item.color}</p>
                <p className="text-left">Số lượng: {item.quantity}</p>
              </div>
            </div>

            <div>
              <p className="text-red-400">
                {numberWithCommas(item.price * (1 - item.discount))}
              </p>
              <p className="line-through">{numberWithCommas(item.price)}₫</p>
            </div>
          </div>
        );
      })}
      <div className="text-left border-b p-4 text-2xl leading-[40px]">
        <p>Giá tạm tính: {numberWithCommas(props.totalPrice)}₫</p>
        <p>
          <span className="">Phụ phí: </span>{" "}
          <span>+{numberWithCommas(surcharge)}₫</span>
        </p>
        <p>
          <span className="font-bold">Tổng tiền: </span>
          <span className="text-red-500">
            {numberWithCommas(amountPaid + surcharge)}₫
          </span>
        </p>
        <p>
          <span className="font-bold"> Số tiền đã thanh toán: </span>

          <span className="text-red-400">
            <CheckCircleFill className="text-blue-500 text-xl" />{" "}
            {numberWithCommas(amountPaid + surcharge)}₫
          </span>
        </p>
      </div>
      <div className=" text-left border-b p-4 text-2xl leading-[40px]">
        <p className="font-bold text-2xl">
          Địa chỉ và thông tin người nhận hàng
        </p>
        <ul>
          <li>
            {customer.sex} {customer.username} - {customer.phone}
          </li>
          <li>
            Địa chỉ nhận hàng {customer.address.ward}{" "}
            {customer.address.district} {customer.address.city}
          </li>
          <li>Thời gian nhận hàng: {deliveryTime}</li>
        </ul>
      </div>
      <div className="flex justify-center py-4">
        <button
          className="bg-blue-400 rounded-xl p-4"
          onClick={() =>
            props.setOrderDetail((current: any) => {
              return current.index === props.index
                ? {
                    index: -1,
                    id: props.id,
                  }
                : {
                    index: props.index,
                    id: props.id,
                  };
            })
          }
        >
          Ẩn xem chi tiết
        </button>
      </div>
    </div>
  );
}

export default OrderDetail;
