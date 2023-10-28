export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "img",
    headerName: "Image",
    width: 230,
    renderCell: (params: any) => {
      return (
        <div className="flex items-center ">
          <img
            className="w-8 h-8 rounded-[50%] object-cover mr-5 "
            src={params.row.img}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "url",
    headerName: "Url",
    width: 300,
  },
  {
    field: "slug",
    headerName: "Slug",
    width: 150,
  },
];
export const commentColumns = [
  { field: "id", headerName: "IdComment", width: 70 },

  {
    field: "creator",
    headerName: "Username",
    width: 150,
    valueGetter: (params: any) => {
      let result = [];
      if (params.row.creator) {
        if (params.row.creator.username) {
          result.push(params.row.creator.username);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    },
  },
  {
    field: "content",
    headerName: "Content",
    width: 230,
  },

  {
    field: "create_date",
    headerName: "Date",
    width: 100,
  },
  {
    field: "replyforId",
    headerName: "IdParent",
    width: 130,
    valueGetter: (params: any) => {
      let result = [];
      if (params.row.creator) {
        if (params.row.creator.replyforId) {
          result.push(params.row.creator.replyforId);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    },
  },
  ,
  {
    field: "productId",
    headerName: "Product",
    width: 100,
  },
];

export const userColumns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 230,
    renderCell: (params: any) => {
      return (
        <div className="flex items-center">
          <img className="cellImg" src={params.row.avatar} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "Name",
    width: 230,
    renderCell: (params: any) => {
      return <div className="flex items-center">{params.row.username}</div>;
    },
  },
  {
    field: "sex",
    headerName: "Gender",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 500,
    valueGetter: (params: any) => {
      let result = [];
      if (params.row.address) {
        result.push(
          params.row.address.homeAdd +
            ", " +
            params.row.address.ward +
            ", " +
            params.row.address.district +
            ", " +
            params.row.address.city
        );
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    },
  },
];

export const reviewProductColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    renderCell: (params: any) => {
      return <div className="flex items-center">{params.row.id}</div>;
    },
  },
  {
    field: "product",
    headerName: "Product",
    width: 550,
    renderCell: (params: any) => {
      return (
        <div className="flex items-center">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },

  {
    field: "star",
    headerName: "Stars",
    width: 80,
    renderCell: (params: any) => {
      return <div className="flex items-center">{params.row.star}</div>;
    },
  },
  {
    field: "totalVote",
    headerName: "Total Vote",
    width: 90,
    renderCell: (params: any) => {
      return <div className="flex items-center">{params.row.totalVote}</div>;
    },
  },
];

export const reviewDetailColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 400,
    renderCell: (params: any) => {
      return <div className="flex items-center">{params.row.id}</div>;
    },
  },

  {
    field: "user",
    headerName: "User",
    width: 100,
    renderCell: (params: any) => {
      return (
        <div className="flex items-center">{params.row.user.username}</div>
      );
    },
  },

  {
    field: "star",
    headerName: "Stars",
    width: 80,
    renderCell: (params: any) => {
      return <div className="flex items-center">{params.row.star}</div>;
    },
  },
  {
    field: "content",
    headerName: "Content",
    width: 230,
  },
];
