export const productHistory = {
  getItems() {
    // return JSON.parse(localStorage.getItem("__productHistory")) || [];
  },

  saveItems(data: any) {
    const products = this.getItems();

    // if (products.length === 0) products.push(data);

    // const check = products.every((item) => item.slug !== data.slug);
    // if (check) {
    //   products.push(data);
    // }

    localStorage.setItem("__productHistory", JSON.stringify(products));
  },

  clearProductHistory() {
    localStorage.removeItem("__productHistory");
  },
};
