import { CheckCircleFill } from "react-bootstrap-icons";

import "./table.scss";
import numberWithCommas from "src/utils/numberWithCommas";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getDetailPurchase,
  getPurchase,
} from "src/store/purchases/productSlice";
import { getDetailUser } from "src/store/user/userSlice";
interface Props {
  order: any;
  displayDetail: any;
  setOrderDetail: any;
  index: number;
}
const OrderDetail = ({ order, index, setOrderDetail }: Props) => {
  console.log(order);
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
  const dispatch = useAppDispatch();
  const { purchase, purchaseDetail } = useAppSelector(
    (state) => state.purchase,
  );
  const { userDetail, user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getDetailPurchase(order?._id));
  }, []);

  useEffect(() => {
    if (purchaseDetail?.purchaseInDb?.user !== undefined) {
      dispatch(getDetailUser(purchaseDetail?.purchaseInDb?.user));
    } else {
    }
  }, [purchaseDetail]);
  console.log(userDetail);
  const checkPayment = order?.paymentStatusString === "Unpaid" ? false : true;
  return (
    <div>
      <div className="py-8 border-b">
        <div className="flex justify-between">
          <h2 className="font-bold text-3xl">Chi tiết đơn hàng: #{index}</h2>
          <p className="text-2xl">
            Trạng thái: <span className={style(order.status)}>{"Đã đặt"}</span>
          </p>
        </div>
        <p className="text-2xl">Mua tại website.com</p>
      </div>
      <div>
        <p className="font-medium text-3xl">
          {purchaseDetail?.purchaseInDb?.product?.name}
        </p>

        <p className="font-medium text-xl">
          Số lượng: {purchaseDetail?.purchaseInDb?.buy_count}
        </p>
      </div>
      <div className="font-medium text-3xl">
        <p className="line-through">
          {numberWithCommas(
            purchaseDetail?.purchaseInDb?.product?.price_before_discount,
          )}
          ₫
        </p>
        <p className="text-red-400">
          {numberWithCommas(purchaseDetail?.purchaseInDb?.product?.price)}đ
        </p>
      </div>
      {purchaseDetail?.images?.map((item: any, index: number) => {
        return (
          <div className="flex justify-between py-4 border-b" key={index}>
            <div className="flex space-x-5">
              <div className="w-28 h-20">
                <img className="object-contain" src={item} alt={item} />
              </div>
            </div>
          </div>
        );
      })}
      <div className="border-b p-4 text-2xl leading-[40px]">
        <p>
          Giá tạm tính:{" "}
          {numberWithCommas(
            purchaseDetail?.purchaseInDb?.price *
              purchaseDetail?.purchaseInDb?.buy_count,
          )}
          ₫
        </p>
        <p>
          <span className="">Phí giao hàng: </span>{" "}
          <span>{numberWithCommas(0)}₫</span>
        </p>
        <p>
          {/* <span className="">Giảm giá: </span>{" "} */}
          {/* <span>{numberWithCommas(order?.price)}₫</span> */}
        </p>
        <p>
          <span className="font-bold">Tổng tiền: </span>
          <span className="text-red-500">
            {numberWithCommas(
              purchaseDetail?.purchaseInDb?.price *
                purchaseDetail?.purchaseInDb?.buy_count,
            )}
          </span>
        </p>
        <p>
          <CheckCircleFill className="text-blue-500" />
          <span className="font-bold"> Số tiền đã thanh toán: </span>
          {/* {checkPayment && (
            <span className="text-red-400">
              {numberWithCommas(order?.price)}₫
            </span>
          )} */}
          {checkPayment === true && (
            <>
              <span className="text-red-400">Chưa thanh toán</span>{" "}
            </>
          )}
        </p>
      </div>
      <div className="border-b p-4 text-2xl leading-[40px]">
        <p className="font-bold text-2xl">
          Địa chỉ và thông tin người nhận hàng
        </p>
        <ul>
          <li>Tên người nhận {userDetail?.name}</li>
          <li>Email người nhận {userDetail?.email}</li>
          <li>
            {userDetail?.address} - {userDetail?.phone}
          </li>
        </ul>
      </div>

      <div className="flex justify-center py-4">
        <Button
          type="link"
          onClick={() =>
            setOrderDetail((current: any) => {
              return current.index === index
                ? {
                    index: -1,
                    id: order.id,
                  }
                : {
                    index: index,
                    id: order.id,
                  };
            })
          }
        >
          Ẩn xem chi tiết
        </Button>
      </div>
    </div>
  );
};

export default OrderDetail;

