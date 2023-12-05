import { useEffect } from "react";
import { Table } from "flowbite-react";
import OrderDetail from "./OrderDetail";
import "./table.scss";
import clsx from "clsx";
import { useState } from "react";
import numberWithCommas from "src/utils/numberWithCommas";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { Button, Pagination } from "antd";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  getPurchase,
  updateCancel,
  updateDelivered,
  updateGetting,
  updateProgress,
} from "src/store/purchases/productSlice";

const Order = ({ title }: { title?: string }) => {
  const style = (text: number) => {
    switch (text) {
      case 1:
        return "text-blue-400 uppercase text-xl font-bold";
      case 2:
        return "text-blue-400 uppercase text-xl font-bold";
      case 5:
        return "text-red-400 uppercase text-xl font-bold";
      case 3:
        return "text-green-400 font-bold uppercase text-xl";
      case 4:
        return "text-yellow-400 font-bold uppercase text-xl";
    }
  };

  const stringStatus = (text: number) => {
    switch (text) {
      case 1:
        return "Đã đặt hàng";
      case 3:
        return "ĐANG GIAO HÀNG";
      case 5:
        return "Đã hủy";
      case 2:
        return "Đã xác nhận";
      case 4:
        return "Đã giao hàng";
    }
  };
  const [orderDetail, setOrderDetail] = useState({ index: -1, id: null });
  const dispatch = useAppDispatch();
  const { purchase } = useAppSelector((state) => state.purchase);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getPurchase(""));
  }, []);

  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const pageSize = 10; // Số phần tử trên mỗi trang

  const _updateGetting = async (id: number) => {
    if (confirm("Bạn có muốn Xác nhận đơn hàng không?")) {
      const res = await dispatch(updateGetting(id));

      if (res) {
        toast.success("Xác nhận thành công");
      }
      await dispatch(getPurchase(""));
    }
  };

  const _updateDelivered = async (id: number) => {
    if (confirm("Bạn có muốn Xác nhận đơn hàng thành công không?")) {
      const res = await dispatch(updateDelivered(id));

      if (res) {
        toast.success("Giao hàng thành công");
      }
      dispatch(getPurchase(""));
    }
  };

  const _updateProgress = async (id: number) => {
    if (confirm("Bạn có muốn giao cho đơn vị vận chuyển không?")) {
      const res = await dispatch(updateProgress(id));

      if (res) {
        toast.success("Chuyển giao thành công");
      }
      dispatch(getPurchase(""));
    }
  };

  const _handleCancel = async (id: number) => {
    if (confirm("Bạn có muốn Hủy đơn hàng không?")) {
      const res = await dispatch(updateCancel(id));
      if (res) {
        toast.success("Hủy đơn thành công");
      }
      dispatch(getPurchase(""));
    }
  };

  // useEffect(() => {
  //   dispatch(getPurchase({ pageNumber: currentPage }));
  // }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  useEffect(() => {
    document.title = title || "";
  }, [title]);

  return (
    <div className="h-1/2">
      <Helmet>
        <title>{"Trang quản lý đơn hàng "}</title>
        <meta name="description" />
      </Helmet>
      <Table hoverable={true} className="bg-transparent">
        <Table.Head>
          <Table.HeadCell> Mã đơn hàng </Table.HeadCell>
          <Table.HeadCell>Sản phẩm</Table.HeadCell>
          <Table.HeadCell>Số lượng</Table.HeadCell>
          {/* <Table.HeadCell>Giá gốc</Table.HeadCell> */}
          <Table.HeadCell>Giá</Table.HeadCell>
          <Table.HeadCell> Ngày đặt mua</Table.HeadCell>
          <Table.HeadCell>Trạng thái</Table.HeadCell>
          <Table.HeadCell>
            <span className="">Chỉnh sửa</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className=" ">
          {purchase?.map((_order: any, index: number) => {
            const styleStatus = style(_order?.status);
            const displayDetail = index === orderDetail?.index;
            const displayCancelBtn = _order.status != 1;
            const displayButtonDelivered = _order.status === 4;

            return (
              <>
                <Table.Row
                  key={index}
                  className=" dark:border-gray-700 dark:bg-gray-800 overflow-hidden"
                >
                  <Table.Cell className="text-blue-400 text-2xl">
                    #{index}
                  </Table.Cell>
                  <Table.Cell className="text-blue-400 hover:text-blue-700 select-none text-2xl">
                    <Button
                      type="link"
                      className="p-0"
                      onClick={() =>
                        setOrderDetail((current) => {
                          return current.index === index
                            ? {
                                index: -1,
                                id: _order._id,
                              }
                            : {
                                index,
                                id: _order._id,
                              };
                        })
                      }
                    >
                      Xem chi tiết
                    </Button>
                  </Table.Cell>
                  <Table.Cell className="text-2xl">
                    {_order?.buy_count}
                  </Table.Cell>
                  {/* <Table.Cell className="text-red-400 text-2xl">
                    {numberWithCommas(_order?.price_before_discount)}₫
                  </Table.Cell> */}
                  <Table.Cell className="text-red-400 text-2xl">
                    {numberWithCommas(_order?.price)}₫
                  </Table.Cell>
                  <Table.Cell className="text-2xl">
                    {" "}
                    <p className="">{_order?.createdAt.substring(0, 10)}</p>
                  </Table.Cell>
                  <Table.Cell className={styleStatus}>
                    <div className="flex flex-grow justify-between text-xl font-bold">
                      {stringStatus(_order.status)}
                      <span className="text-white text-xl bg-gray-500 p-2 rounded-lg">
                        Chưa thanh toán
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="space-x-3">
                    {_order.status === 1 ? (
                      <Button
                        type="link"
                        // disabled={displayCancelBtn}
                        id={_order._id}
                        onClick={() => _updateGetting(_order._id)}
                        className={clsx(
                          "bg-yellow-500 text-xl font-medium rounded-lg  text-white",
                        )}
                      >
                        Xác nhận
                      </Button>
                    ) : _order.status === 2 ? (
                      <Button
                        type="link"
                        // disabled={displayCancelBtn}
                        id={_order._id}
                        onClick={() => _updateProgress(_order._id)}
                        className={clsx(
                          "bg-blue-500 text-xl font-medium rounded-lg  text-white",
                        )}
                      >
                        Giao vận chuyển
                      </Button>
                    ) : _order.status === 3 ? (
                      <Button
                        type="link"
                        disabled={displayButtonDelivered}
                        id={_order._id}
                        onClick={() => _updateDelivered(_order._id)}
                        className={clsx(
                          "bg-green-500 text-xl font-medium rounded-lg  text-white",
                          displayButtonDelivered &&
                            "!bg-gray-100 !text-gray-700",
                        )}
                      >
                        Đã giao hàng
                      </Button>
                    ) : (
                      <Button
                        type="link"
                        disabled={displayCancelBtn}
                        id={_order._id}
                        // onClick={() => handleAccept(_order._id)}
                        className={clsx(
                          displayCancelBtn && "!bg-gray-100 !text-gray-700",
                        )}
                      >
                        Xác nhận
                      </Button>
                    )}

                    <Button
                      type="link"
                      disabled={displayCancelBtn}
                      id={_order._id}
                      onClick={() => _handleCancel(_order._id)}
                      className={clsx(
                        "bg-red-500 text-xl font-medium rounded-lg  text-white",
                        displayCancelBtn && "!bg-gray-100 !text-gray-700",
                      )}
                    >
                      Hủy đơn
                    </Button>
                  </Table.Cell>
                </Table.Row>
                {displayDetail && (
                  <Table.Row>
                    <Table.Cell className="" colSpan={7}>
                      <OrderDetail
                        order={_order}
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
      {/* <div className="fixed bottom-12 left-auto">
        <Pagination
          current={currentPage + 1}
          pageSize={pageSize}
          total={purchase?.length}
          onChange={handlePageChange}
        />
      </div> */}
    </div>
  );
};

export default Order;

