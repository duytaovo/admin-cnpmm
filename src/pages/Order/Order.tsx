import { useEffect } from "react";
import { Table } from "flowbite-react";
import OrderDetail from "./OrderDetail";
import "./table.scss";
import clsx from "clsx";
import { useState } from "react";
import numberWithCommas from "src/utils/numberWithCommas";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { orderService } from "src/services/order.service";
import { getAllOrders } from "src/store/order/ordersApi";

const Order = ({ title }: { title?: string }) => {
  const style = (text: string) => {
    switch (text) {
      case "Đã đặt hàng":
      case "Đặt hàng":
        return "text-blue-400 uppercase font-bold";
      case "Đang giao hàng":
        return "text-blue-400";
      case "Đã hủy":
        return "text-red-400 uppercase font-bold";
      case "Đã xác nhận":
        return "text-green-400 font-bold uppercase";
    }
  };
  const [orderDetail, setOrderDetail] = useState({ index: -1, id: null });

  const handleCancel = async (e: any) => {
    if (confirm("Bạn có muốn Xác nhận đơn hàng không?")) {
      const id = e.target.id;
      const data = JSON.stringify({ status: "Đã xác nhận" });
      const res = await orderService.updateHistoryOrder(id, data);
      if (res) {
        alert("Xác nhận thành công");
      }
    }
  };

  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.orders.order.data);

  useEffect(() => {
    getAllOrders(dispatch);
  }, []);

  useEffect(() => {
    document.title = title || "";
  }, [title]);

  return (
    <div className="h-1/2">
      <Table hoverable={true} className="bg-transparent">
        <Table.Head>
          <Table.HeadCell> Mã đơn hàng </Table.HeadCell>
          <Table.HeadCell>Sản phẩm</Table.HeadCell>
          <Table.HeadCell>Số lượng</Table.HeadCell>
          <Table.HeadCell>Giá</Table.HeadCell>
          <Table.HeadCell> Ngày đặt mua</Table.HeadCell>
          <Table.HeadCell>Trạng thái</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Chỉnh sửa</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className=" ">
          {orders.map((order: any, index) => {
            const styleStatus = style(order.status);
            const displayDetail = index === orderDetail.index;
            const displayCancelBtn = order.status != "Đặt hàng";
            const styleDisable = "bg-gray-100";
            return (
              <>
                <Table.Row className=" dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
                  <Table.Cell className="text-blue-400">#{order.id}</Table.Cell>
                  <Table.Cell className="text-blue-400 hover:text-blue-700 select-none">
                    <button
                      onClick={() =>
                        setOrderDetail((current) => {
                          return current.index === index
                            ? {
                                index: -1,
                                id: order.id,
                              }
                            : {
                                index,
                                id: order.id,
                              };
                        })
                      }
                    >
                      Xem chi tiết
                    </button>
                  </Table.Cell>
                  <Table.Cell>{order.totalQuantity}</Table.Cell>
                  <Table.Cell className="text-red-400">
                    {numberWithCommas(order.totalPrice)}₫
                  </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <p className="">{order.createdAt}</p>{" "}
                  </Table.Cell>

                  <Table.Cell className={styleStatus}>
                    {order.status}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      disabled={displayCancelBtn}
                      id={order.id}
                      onClick={handleCancel}
                      className={clsx(
                        "bg-red-500 text-xl font-medium p-4 rounded-lg  text-white",
                        displayCancelBtn && "!bg-gray-100 !text-gray-700"
                      )}
                    >
                      Xác nhận
                    </button>
                  </Table.Cell>
                </Table.Row>
                {displayDetail && (
                  <Table.Row>
                    <Table.Cell className="" colSpan={7}>
                      <OrderDetail
                        {...order}
                        displayDetail={displayDetail}
                        setOrderDetail={setOrderDetail}
                        index={index}
                      />
                    </Table.Cell>
                  </Table.Row>
                )}
              </>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Order;
