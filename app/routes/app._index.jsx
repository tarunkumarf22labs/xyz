import { useEffect, useRef, useState } from "react";
import { json } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit
} from "@remix-run/react";
import { Page, Layout, VerticalStack, Card } from "@shopify/polaris";

import { authenticate } from "../shopify.server";
// import { nanoid } from "nanoid";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  return json({ shop: session.shop.replace(".myshopify.com", "") });
};

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);

  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
          variants: [{ price: Math.random() * 100 }]
        }
      }
    }
  );

  const responseJson = await response.json();

  return json({
    product: responseJson.data.productCreate.product
  });
}
const dataURL  = "https://shopify-shopclips.bmohox.easypanel.host";
export default function Index() {
  const [boxes, setBoxes] = useState([]);
  const { shop } = useLoaderData();
  async function handleData() {
  const myHeaders = new Headers();
myHeaders.append("accept", "application/json");
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

 try{
  const Store = await fetch(`${dataURL}/api/stores?filters[name][$contains]=${shop}`, requestOptions)
  const data = await Store.json();
   return data
 } catch (error) {
   console.log(error);
 }

  }
  
  async function handleStorename() {
   var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "data": {
        "name": shop
      }
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    
    
    // .then(response => response.json())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
    try {
    const store =    await fetch(`${dataURL}/api/stores`, requestOptions);
    const data  =    await store.json();
    // location.reload()
    } catch (error) {
      
    }
  }

  useEffect(() => {
    async function handleIsExist() {
      const isStoreExist = await handleData();
      if (!(isStoreExist.data.length !== 0)) {
        await handleStorename(); // Call handleStorename only when store does not exist
      }
    }
    handleIsExist();
  }, []);
  

  function datafilter(result) {
    const data = {
      "data": [
        {
          "id": 3,
          "attributes": {
            "Store": "test-for-qa",
            "createdAt": "2023-09-27T19:30:35.299Z",
            "updatedAt": "2023-09-27T19:30:35.299Z",
            "publishedAt": "2023-09-27T19:30:35.269Z",
            "clips": [
              {
                "id": 3,
                "url": "https://test-for-qa.myshopify.com/admin/apps/herostars/app",
                "tags": [
                  {
                    "availablePublicationCount": 7,
                    "createdAt": "2023-01-24T08:59:29Z",
                    "descriptionHtml": "<span data-mce-fragment=\"1\">Experience great comfort walking in this pair of Formal Shoes from the house of BATA Featuring a contemporary refined design with exceptional comfort, this pair is perfect to give your quintessential dressing an upgrade.</span>",
                    "handle": "bata-men-sa-05-formal-shoes",
                    "hasOnlyDefaultVariant": false,
                    "id": "gid://shopify/Product/7624054767775",
                    "images": [
                      {
                        "id": "gid://shopify/ProductImage/34605072154783",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71vD26G_ECL._UL1500.jpg?v=1674550771"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605072646303",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71j9SvrHuWL._UL1500.jpg?v=1674550772"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605072089247",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/61eXs_kGkCL._UL1500.jpg?v=1674550771"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605072482463",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/814LFX0V7AL._UL1500.jpg?v=1674550772"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605072613535",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/81obHJuivuL._UL1500.jpg?v=1674550772"
                      }
                    ],
                    "options": [
                      {
                        "id": "gid://shopify/ProductOption/9806905344159",
                        "name": "Size",
                        "position": 1,
                        "values": [
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                          "10",
                          "11",
                          "12",
                          "13",
                          "14",
                          "15",
                          "16",
                          "17",
                          "18",
                          "19",
                          "20",
                          "21",
                          "22",
                          "23",
                          "24",
                          "25"
                        ]
                      }
                    ],
                    "productType": "Shoes",
                    "publishedAt": "2023-01-24T08:59:30Z",
                    "tags": [],
                    "templateSuffix": "",
                    "title": "BATA Men Sa 05 Formal Shoes",
                    "totalInventory": 25,
                    "tracksInventory": true,
                    "updatedAt": "2023-08-31T14:35:31Z",
                    "variants": [
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 5",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788197535",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183747743"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 1,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "5"
                          }
                        ],
                        "sku": "26",
                        "taxable": true,
                        "title": "5",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 6",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788230303",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183780511"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 2,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "6"
                          }
                        ],
                        "sku": "27",
                        "taxable": true,
                        "title": "6",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 7",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788263071",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183813279"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 3,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "7"
                          }
                        ],
                        "sku": "28",
                        "taxable": true,
                        "title": "7",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 8",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788295839",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183846047"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 4,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "8"
                          }
                        ],
                        "sku": "29",
                        "taxable": true,
                        "title": "8",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 9",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788328607",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183878815"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 5,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "9"
                          }
                        ],
                        "sku": "30",
                        "taxable": true,
                        "title": "9",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 10",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479911985311",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429006495"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 6,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "10"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "10",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 11",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912018079",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429039263"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 7,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "11"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "11",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 12",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912050847",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429072031"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 8,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "12"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "12",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 13",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912083615",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429104799"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 9,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "13"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "13",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 14",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912116383",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429137567"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 10,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "14"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "14",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 15",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912149151",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429170335"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 11,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "15"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "15",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 16",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915360415",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432381599"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 12,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "16"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "16",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 17",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915393183",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432414367"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 13,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "17"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "17",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 18",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915425951",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432447135"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 14,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "18"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "18",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 19",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915458719",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432479903"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 15,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "19"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "19",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 20",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915491487",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432512671"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 16,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "20"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "20",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 21",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915524255",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432545439"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 17,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "21"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "21",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 22",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915557023",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432578207"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 18,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "22"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "22",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 23",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915589791",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432610975"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 19,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "23"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "23",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 24",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915622559",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432643743"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 20,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "24"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "24",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 25",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915655327",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432676511"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 21,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "25"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "25",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      }
                    ],
                    "vendor": "Company 123",
                    "status": "ACTIVE"
                  },
                  {
                    "availablePublicationCount": 7,
                    "createdAt": "2023-01-24T09:06:37Z",
                    "descriptionHtml": "",
                    "handle": "bata-mens-cario-mocc-formal-shoes",
                    "hasOnlyDefaultVariant": false,
                    "id": "gid://shopify/Product/7624061583519",
                    "images": [
                      {
                        "id": "gid://shopify/ProductImage/34605099909279",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71aqc1xD4EL._UL1500.jpg?v=1674551200"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605099974815",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71z3so-pSBL._UL1500.jpg?v=1674551201"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605099942047",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71O4S0ul47L._UL1500.jpg?v=1674551201"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605099810975",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71m9ArCPPnL._UL1500.jpg?v=1674551200"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605099876511",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71tVPkx41mL._UL1500.jpg?v=1674551200"
                      }
                    ],
                    "options": [
                      {
                        "id": "gid://shopify/ProductOption/9806916747423",
                        "name": "Size",
                        "position": 1,
                        "values": [
                          "5",
                          "6",
                          "7",
                          "8",
                          "9"
                        ]
                      }
                    ],
                    "productType": "Shoes",
                    "publishedAt": "2023-01-24T09:06:39Z",
                    "tags": [],
                    "templateSuffix": "",
                    "title": "BATA Mens Cario Mocc Formal Shoes",
                    "totalInventory": 17,
                    "tracksInventory": true,
                    "updatedAt": "2023-08-23T14:05:32Z",
                    "variants": [
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:37Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 5",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798093471",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193643679"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": -8,
                        "position": 1,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "5"
                          }
                        ],
                        "sku": "28",
                        "taxable": true,
                        "title": "5",
                        "updatedAt": "2023-01-27T10:43:25Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:37Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 6",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798126239",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193676447"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 4,
                        "position": 2,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "6"
                          }
                        ],
                        "sku": "29",
                        "taxable": true,
                        "title": "6",
                        "updatedAt": "2023-03-10T06:56:51Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:37Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 7",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798159007",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193709215"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 6,
                        "position": 3,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "7"
                          }
                        ],
                        "sku": "30",
                        "taxable": true,
                        "title": "7",
                        "updatedAt": "2023-01-27T10:43:25Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:38Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 8",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798191775",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193741983"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 7,
                        "position": 4,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "8"
                          }
                        ],
                        "sku": "31",
                        "taxable": true,
                        "title": "8",
                        "updatedAt": "2023-01-27T10:43:25Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:38Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 9",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798224543",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193774751"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 8,
                        "position": 5,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "9"
                          }
                        ],
                        "sku": "32",
                        "taxable": true,
                        "title": "9",
                        "updatedAt": "2023-01-27T10:43:26Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      }
                    ],
                    "vendor": "Sterling Ltd",
                    "status": "ACTIVE"
                  }
                ],
                "video": "https://shopclips1.s3.ap-south-1.amazonaws.com/file_af5112c0c6.mp4",
                "image": {
                  "data": null
                }
              }
            ]
          }
        },
        {
          "id": 4,
          "attributes": {
            "Store": "test-for-qa",
            "createdAt": "2023-09-27T19:30:38.127Z",
            "updatedAt": "2023-09-27T19:30:38.127Z",
            "publishedAt": "2023-09-27T19:30:38.107Z",
            "clips": [
              {
                "id": 4,
                "url": "https://test-for-qa.myshopify.com/admin/apps/herostars/app",
                "tags": [
                  {
                    "availablePublicationCount": 7,
                    "createdAt": "2023-01-24T08:59:29Z",
                    "descriptionHtml": "<span data-mce-fragment=\"1\">Experience great comfort walking in this pair of Formal Shoes from the house of BATA Featuring a contemporary refined design with exceptional comfort, this pair is perfect to give your quintessential dressing an upgrade.</span>",
                    "handle": "bata-men-sa-05-formal-shoes",
                    "hasOnlyDefaultVariant": false,
                    "id": "gid://shopify/Product/7624054767775",
                    "images": [
                      {
                        "id": "gid://shopify/ProductImage/34605072154783",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71vD26G_ECL._UL1500.jpg?v=1674550771"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605072646303",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71j9SvrHuWL._UL1500.jpg?v=1674550772"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605072089247",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/61eXs_kGkCL._UL1500.jpg?v=1674550771"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605072482463",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/814LFX0V7AL._UL1500.jpg?v=1674550772"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605072613535",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/81obHJuivuL._UL1500.jpg?v=1674550772"
                      }
                    ],
                    "options": [
                      {
                        "id": "gid://shopify/ProductOption/9806905344159",
                        "name": "Size",
                        "position": 1,
                        "values": [
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                          "10",
                          "11",
                          "12",
                          "13",
                          "14",
                          "15",
                          "16",
                          "17",
                          "18",
                          "19",
                          "20",
                          "21",
                          "22",
                          "23",
                          "24",
                          "25"
                        ]
                      }
                    ],
                    "productType": "Shoes",
                    "publishedAt": "2023-01-24T08:59:30Z",
                    "tags": [],
                    "templateSuffix": "",
                    "title": "BATA Men Sa 05 Formal Shoes",
                    "totalInventory": 25,
                    "tracksInventory": true,
                    "updatedAt": "2023-08-31T14:35:31Z",
                    "variants": [
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 5",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788197535",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183747743"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 1,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "5"
                          }
                        ],
                        "sku": "26",
                        "taxable": true,
                        "title": "5",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 6",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788230303",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183780511"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 2,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "6"
                          }
                        ],
                        "sku": "27",
                        "taxable": true,
                        "title": "6",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 7",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788263071",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183813279"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 3,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "7"
                          }
                        ],
                        "sku": "28",
                        "taxable": true,
                        "title": "7",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 8",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788295839",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183846047"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 4,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "8"
                          }
                        ],
                        "sku": "29",
                        "taxable": true,
                        "title": "8",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 9",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788328607",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183878815"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 5,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "9"
                          }
                        ],
                        "sku": "30",
                        "taxable": true,
                        "title": "9",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 10",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479911985311",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429006495"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 6,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "10"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "10",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 11",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912018079",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429039263"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 7,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "11"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "11",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 12",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912050847",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429072031"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 8,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "12"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "12",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 13",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912083615",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429104799"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 9,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "13"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "13",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 14",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912116383",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429137567"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 10,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "14"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "14",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 15",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912149151",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429170335"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 11,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "15"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "15",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 16",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915360415",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432381599"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 12,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "16"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "16",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 17",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915393183",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432414367"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 13,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "17"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "17",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 18",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915425951",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432447135"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 14,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "18"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "18",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 19",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915458719",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432479903"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 15,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "19"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "19",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 20",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915491487",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432512671"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 16,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "20"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "20",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 21",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915524255",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432545439"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 17,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "21"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "21",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 22",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915557023",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432578207"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 18,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "22"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "22",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 23",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915589791",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432610975"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 19,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "23"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "23",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 24",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915622559",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432643743"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 20,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "24"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "24",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 25",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915655327",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432676511"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 21,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "25"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "25",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      }
                    ],
                    "vendor": "Company 123",
                    "status": "ACTIVE"
                  },
                  {
                    "availablePublicationCount": 7,
                    "createdAt": "2023-01-24T09:06:37Z",
                    "descriptionHtml": "",
                    "handle": "bata-mens-cario-mocc-formal-shoes",
                    "hasOnlyDefaultVariant": false,
                    "id": "gid://shopify/Product/7624061583519",
                    "images": [
                      {
                        "id": "gid://shopify/ProductImage/34605099909279",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71aqc1xD4EL._UL1500.jpg?v=1674551200"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605099974815",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71z3so-pSBL._UL1500.jpg?v=1674551201"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605099942047",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71O4S0ul47L._UL1500.jpg?v=1674551201"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605099810975",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71m9ArCPPnL._UL1500.jpg?v=1674551200"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605099876511",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71tVPkx41mL._UL1500.jpg?v=1674551200"
                      }
                    ],
                    "options": [
                      {
                        "id": "gid://shopify/ProductOption/9806916747423",
                        "name": "Size",
                        "position": 1,
                        "values": [
                          "5",
                          "6",
                          "7",
                          "8",
                          "9"
                        ]
                      }
                    ],
                    "productType": "Shoes",
                    "publishedAt": "2023-01-24T09:06:39Z",
                    "tags": [],
                    "templateSuffix": "",
                    "title": "BATA Mens Cario Mocc Formal Shoes",
                    "totalInventory": 17,
                    "tracksInventory": true,
                    "updatedAt": "2023-08-23T14:05:32Z",
                    "variants": [
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:37Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 5",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798093471",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193643679"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": -8,
                        "position": 1,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "5"
                          }
                        ],
                        "sku": "28",
                        "taxable": true,
                        "title": "5",
                        "updatedAt": "2023-01-27T10:43:25Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:37Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 6",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798126239",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193676447"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 4,
                        "position": 2,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "6"
                          }
                        ],
                        "sku": "29",
                        "taxable": true,
                        "title": "6",
                        "updatedAt": "2023-03-10T06:56:51Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:37Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 7",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798159007",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193709215"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 6,
                        "position": 3,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "7"
                          }
                        ],
                        "sku": "30",
                        "taxable": true,
                        "title": "7",
                        "updatedAt": "2023-01-27T10:43:25Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:38Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 8",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798191775",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193741983"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 7,
                        "position": 4,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "8"
                          }
                        ],
                        "sku": "31",
                        "taxable": true,
                        "title": "8",
                        "updatedAt": "2023-01-27T10:43:25Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:38Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 9",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798224543",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193774751"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 8,
                        "position": 5,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "9"
                          }
                        ],
                        "sku": "32",
                        "taxable": true,
                        "title": "9",
                        "updatedAt": "2023-01-27T10:43:26Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      }
                    ],
                    "vendor": "Sterling Ltd",
                    "status": "ACTIVE"
                  }
                ],
                "video": "https://shopclips1.s3.ap-south-1.amazonaws.com/file_af5112c0c6.mp4",
                "image": {
                  "data": null
                }
              }
            ]
          }
        },
        {
          "id": 5,
          "attributes": {
            "Store": "test-for-qa",
            "createdAt": "2023-09-27T19:33:04.833Z",
            "updatedAt": "2023-09-27T19:33:04.833Z",
            "publishedAt": "2023-09-27T19:33:04.813Z",
            "clips": [
              {
                "id": 5,
                "url": "https://test-for-qa.myshopify.com/admin/apps/herostars/app",
                "tags": [
                  {
                    "availablePublicationCount": 7,
                    "createdAt": "2023-01-24T08:59:29Z",
                    "descriptionHtml": "<span data-mce-fragment=\"1\">Experience great comfort walking in this pair of Formal Shoes from the house of BATA Featuring a contemporary refined design with exceptional comfort, this pair is perfect to give your quintessential dressing an upgrade.</span>",
                    "handle": "bata-men-sa-05-formal-shoes",
                    "hasOnlyDefaultVariant": false,
                    "id": "gid://shopify/Product/7624054767775",
                    "images": [
                      {
                        "id": "gid://shopify/ProductImage/34605072154783",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71vD26G_ECL._UL1500.jpg?v=1674550771"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605072646303",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71j9SvrHuWL._UL1500.jpg?v=1674550772"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605072089247",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/61eXs_kGkCL._UL1500.jpg?v=1674550771"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605072482463",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/814LFX0V7AL._UL1500.jpg?v=1674550772"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605072613535",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/81obHJuivuL._UL1500.jpg?v=1674550772"
                      }
                    ],
                    "options": [
                      {
                        "id": "gid://shopify/ProductOption/9806905344159",
                        "name": "Size",
                        "position": 1,
                        "values": [
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                          "10",
                          "11",
                          "12",
                          "13",
                          "14",
                          "15",
                          "16",
                          "17",
                          "18",
                          "19",
                          "20",
                          "21",
                          "22",
                          "23",
                          "24",
                          "25"
                        ]
                      }
                    ],
                    "productType": "Shoes",
                    "publishedAt": "2023-01-24T08:59:30Z",
                    "tags": [],
                    "templateSuffix": "",
                    "title": "BATA Men Sa 05 Formal Shoes",
                    "totalInventory": 25,
                    "tracksInventory": true,
                    "updatedAt": "2023-08-31T14:35:31Z",
                    "variants": [
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 5",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788197535",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183747743"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 1,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "5"
                          }
                        ],
                        "sku": "26",
                        "taxable": true,
                        "title": "5",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 6",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788230303",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183780511"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 2,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "6"
                          }
                        ],
                        "sku": "27",
                        "taxable": true,
                        "title": "6",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 7",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788263071",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183813279"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 3,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "7"
                          }
                        ],
                        "sku": "28",
                        "taxable": true,
                        "title": "7",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 8",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788295839",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183846047"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 4,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "8"
                          }
                        ],
                        "sku": "29",
                        "taxable": true,
                        "title": "8",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-01-24T08:59:29Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 9",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920788328607",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062183878815"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 5,
                        "position": 5,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "9"
                          }
                        ],
                        "sku": "30",
                        "taxable": true,
                        "title": "9",
                        "updatedAt": "2023-01-24T08:59:29Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 10",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479911985311",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429006495"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 6,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "10"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "10",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 11",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912018079",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429039263"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 7,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "11"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "11",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 12",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912050847",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429072031"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 8,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "12"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "12",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 13",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912083615",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429104799"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 9,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "13"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "13",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 14",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912116383",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429137567"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 10,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "14"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "14",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:34:27Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 15",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479912149151",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621429170335"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 11,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "15"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "15",
                        "updatedAt": "2023-08-31T14:34:27Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 16",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915360415",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432381599"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 12,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "16"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "16",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 17",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915393183",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432414367"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 13,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "17"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "17",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 18",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915425951",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432447135"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 14,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "18"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "18",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 19",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915458719",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432479903"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 15,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "19"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "19",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 20",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915491487",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432512671"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 16,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "20"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "20",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 21",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915524255",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432545439"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 17,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "21"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "21",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 22",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915557023",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432578207"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 18,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "22"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "22",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 23",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915589791",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432610975"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 19,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "23"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "23",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 24",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915622559",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432643743"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 20,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "24"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "24",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "999.00",
                        "createdAt": "2023-08-31T14:35:31Z",
                        "displayName": "BATA Men Sa 05 Formal Shoes - 25",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/44479915655327",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/46621432676511"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 0,
                        "position": 21,
                        "price": "796.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624054767775"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "25"
                          }
                        ],
                        "sku": "",
                        "taxable": true,
                        "title": "25",
                        "updatedAt": "2023-08-31T14:35:31Z",
                        "weight": 180,
                        "weightUnit": "KILOGRAMS"
                      }
                    ],
                    "vendor": "Company 123",
                    "status": "ACTIVE"
                  },
                  {
                    "availablePublicationCount": 7,
                    "createdAt": "2023-01-24T09:06:37Z",
                    "descriptionHtml": "",
                    "handle": "bata-mens-cario-mocc-formal-shoes",
                    "hasOnlyDefaultVariant": false,
                    "id": "gid://shopify/Product/7624061583519",
                    "images": [
                      {
                        "id": "gid://shopify/ProductImage/34605099909279",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71aqc1xD4EL._UL1500.jpg?v=1674551200"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605099974815",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71z3so-pSBL._UL1500.jpg?v=1674551201"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605099942047",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71O4S0ul47L._UL1500.jpg?v=1674551201"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605099810975",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71m9ArCPPnL._UL1500.jpg?v=1674551200"
                      },
                      {
                        "id": "gid://shopify/ProductImage/34605099876511",
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0531/1109/5455/products/71tVPkx41mL._UL1500.jpg?v=1674551200"
                      }
                    ],
                    "options": [
                      {
                        "id": "gid://shopify/ProductOption/9806916747423",
                        "name": "Size",
                        "position": 1,
                        "values": [
                          "5",
                          "6",
                          "7",
                          "8",
                          "9"
                        ]
                      }
                    ],
                    "productType": "Shoes",
                    "publishedAt": "2023-01-24T09:06:39Z",
                    "tags": [],
                    "templateSuffix": "",
                    "title": "BATA Mens Cario Mocc Formal Shoes",
                    "totalInventory": 17,
                    "tracksInventory": true,
                    "updatedAt": "2023-08-23T14:05:32Z",
                    "variants": [
                      {
                        "availableForSale": false,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:37Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 5",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798093471",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193643679"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": -8,
                        "position": 1,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "5"
                          }
                        ],
                        "sku": "28",
                        "taxable": true,
                        "title": "5",
                        "updatedAt": "2023-01-27T10:43:25Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:37Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 6",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798126239",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193676447"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 4,
                        "position": 2,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "6"
                          }
                        ],
                        "sku": "29",
                        "taxable": true,
                        "title": "6",
                        "updatedAt": "2023-03-10T06:56:51Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:37Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 7",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798159007",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193709215"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 6,
                        "position": 3,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "7"
                          }
                        ],
                        "sku": "30",
                        "taxable": true,
                        "title": "7",
                        "updatedAt": "2023-01-27T10:43:25Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:38Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 8",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798191775",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193741983"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 7,
                        "position": 4,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "8"
                          }
                        ],
                        "sku": "31",
                        "taxable": true,
                        "title": "8",
                        "updatedAt": "2023-01-27T10:43:25Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      },
                      {
                        "availableForSale": true,
                        "barcode": "",
                        "compareAtPrice": "1999.00",
                        "createdAt": "2023-01-24T09:06:38Z",
                        "displayName": "BATA Mens Cario Mocc Formal Shoes - 9",
                        "fulfillmentService": {
                          "id": "gid://shopify/FulfillmentService/manual",
                          "inventoryManagement": false,
                          "productBased": true,
                          "serviceName": "Manual",
                          "type": "MANUAL"
                        },
                        "id": "gid://shopify/ProductVariant/42920798224543",
                        "inventoryItem": {
                          "__typename": "InventoryItem",
                          "id": "gid://shopify/InventoryItem/45062193774751"
                        },
                        "inventoryManagement": "SHOPIFY",
                        "inventoryPolicy": "DENY",
                        "inventoryQuantity": 8,
                        "position": 5,
                        "price": "699.00",
                        "product": {
                          "__typename": "Product",
                          "id": "gid://shopify/Product/7624061583519"
                        },
                        "requiresShipping": true,
                        "selectedOptions": [
                          {
                            "__typename": "SelectedOption",
                            "value": "9"
                          }
                        ],
                        "sku": "32",
                        "taxable": true,
                        "title": "9",
                        "updatedAt": "2023-01-27T10:43:26Z",
                        "weight": 210,
                        "weightUnit": "KILOGRAMS"
                      }
                    ],
                    "vendor": "Sterling Ltd",
                    "status": "ACTIVE"
                  }
                ],
                "video": "https://shopclips1.s3.ap-south-1.amazonaws.com/file_af5112c0c6.mp4",
                "image": {
                  "data": null
                }
              }
            ]
          }
        }
      ],
      "meta": {
        "pagination": {
          "page": 1,
          "pageSize": 25,
          "pageCount": 1,
          "total": 3
        }
      }
    }

    if(!result?.data?.length){
       setBoxes([{}])
      return 
    }
    // @ts-ignore
    setBoxes(result.data.map((value) =>  { return { url : value?.attributes.clips[0].url , video : value?.attributes.clips[0].video , tags :  value?.attributes.clips[0].tags?.map((prev) =>  {
       return {id : prev.id , handle : prev?.handle} 
    })}}))
    // setdummydata("sajo")
    // setBoxes(data.map((value) =>  { return { url : value?.url , video : value?.video  , tags :  value.Tags.tags?.map((prev) => prev.id ) } }  ))
  }

  async function getDetails() {
    try {
      var requestOptions = {
        method: 'GET',
      };
    
      const response = await fetch(`${dataURL}/api/clips?filters[Store][$contains]=test-for-qa&populate=deep`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      datafilter(result);
    } catch (error) {
      console.log('error', error);
    }
  }
  

  
  useEffect(() => {
    getDetails()
  }, [])
  
  
  function handleCard() {
    // @ts-ignore
    setBoxes([...boxes, {}]);
  }

  return (
    <>
      
      <div
        className="logo-header"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          background: "white",
          marginBottom: "10px"
        }}
      >
        <svg
          width="198"
          height="42"
          viewBox="0 0 198 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_206_2429"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="57"
            height="42"
          >
            <rect width="56.2373" height="42" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_206_2429)">
            <rect
              x="-14.2373"
              y="-15.661"
              width="89.6949"
              height="72.6102"
              fill="url(#pattern0)"
            />
          </g>
          <path
            d="M74.9737 29.4461C73.6672 29.4461 72.4964 29.2352 71.4614 28.8135C70.4264 28.3918 69.595 27.7676 68.9672 26.941C68.3563 26.1143 68.0339 25.119 68 23.955H72.6322C72.7 24.6129 72.9291 25.119 73.3194 25.4733C73.7096 25.8107 74.2186 25.9794 74.8464 25.9794C75.4912 25.9794 76.0002 25.836 76.3735 25.5492C76.7468 25.2455 76.9335 24.8322 76.9335 24.3093C76.9335 23.8707 76.7807 23.508 76.4753 23.2212C76.1869 22.9344 75.8221 22.6982 75.3809 22.5127C74.9567 22.3271 74.3459 22.1162 73.5484 21.88C72.3946 21.5258 71.4529 21.1715 70.7233 20.8172C69.9937 20.463 69.3659 19.94 68.8399 19.2484C68.3139 18.5567 68.0509 17.6542 68.0509 16.5408C68.0509 14.8875 68.6533 13.597 69.858 12.6692C71.0627 11.7245 72.6322 11.2521 74.5665 11.2521C76.5347 11.2521 78.1212 11.7245 79.3259 12.6692C80.5306 13.597 81.1754 14.896 81.2602 16.5661H76.5517C76.5177 15.9925 76.3057 15.5455 75.9154 15.2249C75.5251 14.8875 75.0246 14.7188 74.4138 14.7188C73.8878 14.7188 73.4636 14.8622 73.1412 15.149C72.8188 15.4189 72.6576 15.8154 72.6576 16.3383C72.6576 16.9119 72.9291 17.3589 73.4721 17.6795C74.015 18 74.8634 18.3458 76.0172 18.717C77.171 19.105 78.1042 19.4761 78.8169 19.8304C79.5465 20.1846 80.1743 20.6992 80.7003 21.3739C81.2263 22.0487 81.4893 22.9175 81.4893 23.9803C81.4893 24.9925 81.2263 25.9119 80.7003 26.7385C80.1912 27.5651 79.4447 28.2231 78.4605 28.7123C77.4764 29.2015 76.3141 29.4461 74.9737 29.4461Z"
            fill="black"
          />
          <path
            d="M92.8975 14.9972C94.5264 14.9972 95.8329 15.537 96.817 16.6167C97.8011 17.6795 98.2932 19.1471 98.2932 21.0197V29.269H93.9664V21.6017C93.9664 20.657 93.7204 19.9231 93.2283 19.4002C92.7363 18.8772 92.0745 18.6157 91.2431 18.6157C90.4117 18.6157 89.75 18.8772 89.2579 19.4002C88.7659 19.9231 88.5198 20.657 88.5198 21.6017V29.269H84.1676V10.5436H88.5198V17.0469C88.961 16.4227 89.5633 15.925 90.3269 15.5539C91.0904 15.1828 91.9473 14.9972 92.8975 14.9972Z"
            fill="black"
          />
          <path
            d="M107.782 29.4714C106.391 29.4714 105.135 29.1762 104.015 28.5858C102.912 27.9953 102.039 27.1518 101.394 26.0553C100.766 24.9588 100.452 23.6767 100.452 22.209C100.452 20.7582 100.775 19.4845 101.419 18.388C102.064 17.2746 102.946 16.4227 104.066 15.8322C105.186 15.2418 106.442 14.9466 107.833 14.9466C109.224 14.9466 110.48 15.2418 111.6 15.8322C112.72 16.4227 113.602 17.2746 114.247 18.388C114.892 19.4845 115.214 20.7582 115.214 22.209C115.214 23.6598 114.883 24.9419 114.221 26.0553C113.577 27.1518 112.686 27.9953 111.549 28.5858C110.429 29.1762 109.174 29.4714 107.782 29.4714ZM107.782 25.7263C108.614 25.7263 109.318 25.4227 109.895 24.8154C110.489 24.2081 110.785 23.3393 110.785 22.209C110.785 21.0787 110.497 20.2099 109.92 19.6026C109.36 18.9953 108.665 18.6917 107.833 18.6917C106.985 18.6917 106.281 18.9953 105.721 19.6026C105.161 20.1931 104.881 21.0619 104.881 22.209C104.881 23.3393 105.152 24.2081 105.695 24.8154C106.255 25.4227 106.951 25.7263 107.782 25.7263Z"
            fill="black"
          />
          <path
            d="M121.875 17.1481C122.299 16.4902 122.885 15.9588 123.631 15.5539C124.378 15.149 125.252 14.9466 126.253 14.9466C127.424 14.9466 128.484 15.2418 129.434 15.8322C130.384 16.4227 131.131 17.2662 131.674 18.3627C132.234 19.4592 132.514 20.7329 132.514 22.1837C132.514 23.6345 132.234 24.9166 131.674 26.03C131.131 27.1265 130.384 27.9784 129.434 28.5858C128.484 29.1762 127.424 29.4714 126.253 29.4714C125.269 29.4714 124.395 29.269 123.631 28.8641C122.885 28.4592 122.299 27.9363 121.875 27.2952V36H117.523V15.149H121.875V17.1481ZM128.085 22.1837C128.085 21.104 127.78 20.2605 127.169 19.6532C126.575 19.0291 125.837 18.717 124.955 18.717C124.089 18.717 123.351 19.0291 122.74 19.6532C122.147 20.2774 121.85 21.1293 121.85 22.209C121.85 23.2887 122.147 24.1406 122.74 24.7648C123.351 25.3889 124.089 25.701 124.955 25.701C125.82 25.701 126.558 25.3889 127.169 24.7648C127.78 24.1237 128.085 23.2634 128.085 22.1837Z"
            fill="black"
          />
          <path
            d="M134.059 20.3618C134.059 18.6073 134.441 17.0469 135.204 15.6804C135.968 14.2971 137.028 13.2259 138.386 12.4667C139.76 11.6907 141.313 11.3027 143.043 11.3027C145.164 11.3027 146.98 11.8594 148.49 12.9728C150 14.0862 151.01 15.6045 151.519 17.5276H146.734C146.378 16.7854 145.868 16.2202 145.207 15.8322C144.562 15.4442 143.824 15.2502 142.992 15.2502C141.652 15.2502 140.566 15.7142 139.735 16.642C138.903 17.5698 138.488 18.8097 138.488 20.3618C138.488 21.9138 138.903 23.1537 139.735 24.0815C140.566 25.0094 141.652 25.4733 142.992 25.4733C143.824 25.4733 144.562 25.2793 145.207 24.8913C145.868 24.5033 146.378 23.9381 146.734 23.1959H151.519C151.01 25.119 150 26.6373 148.49 27.7507C146.98 28.8472 145.164 29.3955 143.043 29.3955C141.313 29.3955 139.76 29.0159 138.386 28.2568C137.028 27.4808 135.968 26.4096 135.204 25.0431C134.441 23.6767 134.059 22.1162 134.059 20.3618Z"
            fill="black"
          />
          <path
            d="M158.536 10.5436V29.269H154.184V10.5436H158.536Z"
            fill="black"
          />
          <path
            d="M163.879 13.6813C163.115 13.6813 162.488 13.462 161.996 13.0234C161.52 12.5679 161.283 12.0112 161.283 11.3533C161.283 10.6785 161.52 10.1218 161.996 9.68322C162.488 9.22774 163.115 9 163.879 9C164.626 9 165.236 9.22774 165.711 9.68322C166.204 10.1218 166.45 10.6785 166.45 11.3533C166.45 12.0112 166.204 12.5679 165.711 13.0234C165.236 13.462 164.626 13.6813 163.879 13.6813ZM166.042 15.149V29.269H161.69V15.149H166.042Z"
            fill="black"
          />
          <path
            d="M173.549 17.1481C173.973 16.4902 174.558 15.9588 175.305 15.5539C176.051 15.149 176.925 14.9466 177.926 14.9466C179.097 14.9466 180.157 15.2418 181.108 15.8322C182.058 16.4227 182.804 17.2662 183.347 18.3627C183.907 19.4592 184.187 20.7329 184.187 22.1837C184.187 23.6345 183.907 24.9166 183.347 26.03C182.804 27.1265 182.058 27.9784 181.108 28.5858C180.157 29.1762 179.097 29.4714 177.926 29.4714C176.942 29.4714 176.068 29.269 175.305 28.8641C174.558 28.4592 173.973 27.9363 173.549 27.2952V36H169.196V15.149H173.549V17.1481ZM179.759 22.1837C179.759 21.104 179.453 20.2605 178.842 19.6532C178.249 19.0291 177.51 18.717 176.628 18.717C175.763 18.717 175.025 19.0291 174.414 19.6532C173.82 20.2774 173.523 21.1293 173.523 22.209C173.523 23.2887 173.82 24.1406 174.414 24.7648C175.025 25.3889 175.763 25.701 176.628 25.701C177.493 25.701 178.232 25.3889 178.842 24.7648C179.453 24.1237 179.759 23.2634 179.759 22.1837Z"
            fill="black"
          />
          <path
            d="M192.248 29.4714C191.009 29.4714 189.906 29.2605 188.939 28.8388C187.972 28.4171 187.209 27.8435 186.649 27.1181C186.089 26.3758 185.775 25.5492 185.707 24.6382H190.008C190.059 25.1275 190.288 25.5239 190.695 25.8276C191.103 26.1312 191.603 26.283 192.197 26.283C192.74 26.283 193.156 26.1818 193.444 25.9794C193.75 25.7601 193.902 25.4817 193.902 25.1443C193.902 24.7395 193.69 24.4442 193.266 24.2587C192.842 24.0562 192.155 23.8369 191.204 23.6007C190.186 23.3646 189.338 23.12 188.659 22.8669C187.981 22.597 187.395 22.1837 186.903 21.627C186.411 21.0534 186.165 20.2858 186.165 19.3243C186.165 18.5145 186.386 17.7807 186.827 17.1228C187.285 16.448 187.947 15.9166 188.812 15.5286C189.694 15.1406 190.738 14.9466 191.943 14.9466C193.724 14.9466 195.124 15.3852 196.142 16.2624C197.177 17.1396 197.771 18.3037 197.924 19.7545H193.902C193.834 19.2652 193.614 18.8772 193.241 18.5904C192.884 18.3037 192.409 18.1603 191.815 18.1603C191.306 18.1603 190.916 18.2615 190.645 18.4639C190.373 18.6495 190.237 18.911 190.237 19.2484C190.237 19.6532 190.449 19.9569 190.874 20.1593C191.315 20.3618 191.993 20.5642 192.91 20.7666C193.962 21.0366 194.819 21.3065 195.48 21.5764C196.142 21.8294 196.719 22.2512 197.211 22.8416C197.72 23.4152 197.983 24.1912 198 25.1696C198 25.9963 197.762 26.7385 197.287 27.3964C196.829 28.0375 196.159 28.5436 195.277 28.9147C194.411 29.2858 193.402 29.4714 192.248 29.4714Z"
            fill="black"
          />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                href="#image0_206_2429"
                transform="matrix(0.0027933 0 0 0.00345054 0 -0.000328633)"
              />
            </pattern>
            <image
              id="image0_206_2429"
              width="358"
              height="290"
              href="data:image/png;base64,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9NzTZgdAPTJMtUWsVgBOIG6wDtF2A2CqJQpzA7C1tdRne9/pPn3KsMgXy36PKXq4c/GsptRmevi/1P3PEUyp2oB/jv8CnVoGniOa0hwAAAAJcEhZcwAACxIAAAsSAdLdfvwAAGfQSURBVHhe7X0HYBzXde32ikUHSYBg710iRYmULMmWbNlWL1Svju2fxPFPXH7yEzv5tqPYsp04seNeFMlyUe9dltXF3jtBgui9bu+7/746M1uABTAoJO5KS+zuzLxy3ps75513330GA74QAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABEYTwSM45k4po0IIALji0A6nZb3sNFoTIvcyO/q73qXIl++euczXdNDwzyFW/6FI+H/3NMavw0aKWkgd0LakDKkDUb4bjKSGy9NfjeYP39J0eUzSywn9KrK4ZPhe/68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BBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAAROJsR+P8Hrj3/5wYAFwAAAABJRU5ErkJggg=="
            />
          </defs>
        </svg>
      </div>
      <Page>
       {boxes?.map((data , index) => {
        return(
       <div key={index} style={{ marginTop : "10px" }} >
            <VerticalStack   gap="5">
          <Layout>
            <Layout.Section>
              <CardContent carddata = {data} User={shop} cardNo = {index} />
            </Layout.Section>
          </Layout>
        </VerticalStack>
       </div>
        )
       } )}
 
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <button
            style={{
              width: "114px",
              height: "36px",
              backgroundColor: "#6366F1",
              borderRadius: "4px",
              color: "white",
              marginTop: "10px",
              fontSize: "12px",
              whiteSpace: "nowrap",
              padding: "5px",
              border: "0"
            }}
            onClick={handleCard}
          >
            + Add More
          </button>
        </div>
      </Page>
    </>
  );
}

const CardContent = ({ carddata , User ,cardNo}) => {
  return (
    <div className="mt-2">
      <Card>      
        <VerticalStack gap="5">
          <Frame carddata={carddata}  User={User} cardNo={cardNo} />
        </VerticalStack>
      </Card>
    </div>
  );
};

const Frame = ({ carddata , User , cardNo}) => {
    const initialState = carddata?.url ?  carddata :   {
      url : "",
      video : "",
      tags : [],
};

  const [first, setfirst] = useState(() => initialState?.tags ?? [] );
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [dummydata, setdummydata] = useState(0)
   const inputref =  useRef(null);




  async function handleSubmission(e){
    e.preventDefault()
  var myHeaders = new Headers();
  // myHeaders.append("", "application/json");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    data: {
      Store: User,
      clips: [{
        ...data ,
        tags : data.tags ,
      }]
    }
})



  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };
  
  fetch(`${dataURL}/api/clips`, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
   }

  async function selectProduct(data) {
    try {
      const products = await window.shopify.resourcePicker({
        type: "product",
        action: "add",
        multiple: true,
        selectionIds: first.map((data) => {
          return { id: data?.id };
        }),
        filter: {
          variants: false
        }
      });
      const value = await products;
      // @ts-ignore
      setfirst(products);
      setData((prev) => { 
        return {
          ...prev ,tags : products,
        }
       } )
   
    } catch (error) {
      console.log(error, "error");
    }
  }
  


  function handlevideo(e) {
    e.preventDefault()
    inputref?.current.click()
  }

  async  function handleFileChange(event){
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  
  var formdata = new FormData();
  formdata.append("path", "");
  formdata.append("refId", "");
  formdata.append("ref", "");
  formdata.append("field", "");
  formdata.append("files", event.target.files[0], "/path/to/file");
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
  };
  
  fetch(`${dataURL}/api/upload`, requestOptions)
    .then(response => response.json())
    // https://d1b94xdk5eff5f.cloudfront.net/
    .then(result => setData((prev) => {  return {...prev  , video : `https://d1b94xdk5eff5f.cloudfront.net${result[0].url.split('https://shopclips1.s3.ap-south-1.amazonaws.com')[1]}`} } ))
    .catch(error => console.log('error', error));
  }

  function validate(values) {
    const errors = {
 
    };
    if (!values?.url) {
        errors.productUrl = 'productUrl  is required';
    }
    if (!values?.video) {
        errors.video = 'video  is required';
    } 
    if(values?.tags.length == 0){
      errors.tags = 'You need to define Tags';
    }
    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(data);
    if (!Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      setdummydata(`why i am here ${Object.keys(validationErrors).length} `)
        handleSubmission(event) 
    } else {
      setErrors(validationErrors)
      setdummydata(`why i am coming here ${Object.keys(validationErrors).length} `)
    }
}

  return (
    <div className="" style={{ width: "100%", height: "100%" }}>
      <div className="" style={{ padding: "24px" }}>
        <div
          className=""
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display : "flex" , justifyContent : "space-between" , alignItems : "center" , width : "100%" }} >
                      <h2>Page {cardNo + 1}  </h2>
                      <button onClick={handleSubmit} >Submit</button>
          </div>
        </div>
        <form className='w-full  p-2 lg:max-w-[550px] sm:p-6 bg-white'  >  
        <div>
          <h4 style={{ padding: "9px  0px" }}> Page URL</h4>
          <input
            placeholder="Enter Page URL"
            style={{
              height: "40px",
              width: "100%",
              padding: "9px",
              border: "1px solid #E5E7EB"
            }}
            value={data.url}
            onChange={(e) => {setData((prev) => {
               return { ...prev , url  : e.target.value  }
            } ) } }
          />
        </div>
        {errors?.productUrl ? <h4 style={{ paddingTop : "10px" , paddingBottom : "10px" , color : "red" }} >{errors?.productUrl}</h4> : null }
        
        <div >
          <h4 style={{ padding: "9px  0px" }}>Video</h4>
          <div style={{ display: "flex" }}>
     
            <input
              placeholder="video url"
              type="file"
              accept="video/*"
              style={{
                height: "40px",
                width: "100%",
                padding: "9px",
                border: "1px solid #E5E7EB",
                pointerEvents  : "none",
                display : "none"
              }}
              ref={inputref}
              onChange={(data) =>
                handleFileChange(data)
              }
            />
              
                     <input
              placeholder="Upload a Video"
              style={{
                height: "40px",
                width: "100%",
                padding: "9px",
                border: "1px solid #E5E7EB",
                pointerEvents  : "none",
              }}
              value={data.video}
         disabled
            />
            <button
              style={{
                width: "104px",
                height: "40px",
                background: "#E5E7EB",
                border: "0"
              }}
              onClick={handlevideo}
            >
              Browse
            </button>
          </div>
        
        </div>
              {errors?.video ? <h4 style={{ paddingTop : "10px" , paddingBottom : "10px" , color : "red" }}  >{errors?.video}</h4> : null }
        <div>
          <h4 style={{ padding: "9px  0px" }}>Tag products</h4>
          <div style={{overflow: 'hidden'}}>
            <div
              style={{
                height: "40px",
                width: "100%",
                padding: "9px",
                border: "1px solid #E5E7EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: '1rem',
                overflowX: 'auto',
              }}
              className="tag__product"
              onClick={selectProduct}
            >
              {first?.map((data, i) => {
                return (
                  <div key={i} style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 5, border: '1px solid lightgrey', borderRadius: '15px', padding: '3px'}}>
                    <h2  style={{ whiteSpace: "nowrap" , paddingLeft: '5px'}}>
                      {data?.handle}
                    </h2>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.41489 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875Z"
                        fill="#6366F1"
                        fill-opacity="0.2"
                      />
                      <path
                        d="M12.9422 12.0578C13.0003 12.1159 13.0463 12.1848 13.0778 12.2607C13.1092 12.3365 13.1254 12.4179 13.1254 12.5C13.1254 12.5821 13.1092 12.6634 13.0778 12.7393C13.0463 12.8152 13.0003 12.8841 12.9422 12.9422C12.8841 13.0002 12.8152 13.0463 12.7393 13.0777C12.6635 13.1092 12.5821 13.1253 12.5 13.1253C12.4179 13.1253 12.3366 13.1092 12.2607 13.0777C12.1848 13.0463 12.1159 13.0002 12.0578 12.9422L10 10.8836L7.9422 12.9422C7.88413 13.0002 7.81519 13.0463 7.73932 13.0777C7.66345 13.1092 7.58213 13.1253 7.50001 13.1253C7.41789 13.1253 7.33657 13.1092 7.2607 13.0777C7.18483 13.0463 7.11589 13.0002 7.05782 12.9422C6.99976 12.8841 6.95369 12.8152 6.92227 12.7393C6.89084 12.6634 6.87466 12.5821 6.87466 12.5C6.87466 12.4179 6.89084 12.3365 6.92227 12.2607C6.95369 12.1848 6.99976 12.1159 7.05782 12.0578L9.11642 9.99998L7.05782 7.94217C6.94055 7.82489 6.87466 7.66583 6.87466 7.49998C6.87466 7.33413 6.94055 7.17507 7.05782 7.05779C7.1751 6.94052 7.33416 6.87463 7.50001 6.87463C7.66586 6.87463 7.82492 6.94052 7.9422 7.05779L10 9.11639L12.0578 7.05779C12.1159 6.99972 12.1848 6.95366 12.2607 6.92224C12.3366 6.89081 12.4179 6.87463 12.5 6.87463C12.5821 6.87463 12.6635 6.89081 12.7393 6.92224C12.8152 6.95366 12.8841 6.99972 12.9422 7.05779C13.0003 7.11586 13.0463 7.1848 13.0778 7.26067C13.1092 7.33654 13.1254 7.41786 13.1254 7.49998C13.1254 7.5821 13.1092 7.66342 13.0778 7.73929C13.0463 7.81516 13.0003 7.8841 12.9422 7.94217L10.8836 9.99998L12.9422 12.0578Z"
                        fill="#6366F1"
                      />
                    </svg>
                  </div>
                );
              })}
             <h6 style={{   opacity: 0.7 }} >Tag Multiple Products</h6>
            </div>
          </div>
          {errors?.tags ? <h4 style={{ paddingTop : "10px" , paddingBottom : "10px" ,color : "red" }}   >{errors?.tags}</h4> : null }
        </div>
        </form>
      </div>
    </div>
  );
};

const ToggleButton = ({
  checked,
  onChange,
  color = "bg-slate-100",
  bgColor = "bg-[#95d444]",
  disabled = false,
  variant = "sm"
}) => {
  let variantType;

  switch (variant) {
    case "sm":
      variantType = "w-10 h-[1.4rem]";
      break;
    case "lg":
      variantType = "w-20 h-11";
      break;
    default:
      variantType = "w-14 h-8";
      break;
  }

  return (
    <label
      className={` p-1 relative ${variantType}  rounded-full flex items-center transition-all ease-in-out delay-100 ${
        checked ? `${bgColor}` : "bg-gray-300"
      }`}
      style={{
        padding: ".25rem",
        position: "relative",
        borderRadius: "border-radius: 9999px",
        display: "flex",
        alignItems: "center",
        transition: "all ease-in-out",
        transitionDelay: "100ms",
        background: `${checked ? bgColor : "lightgrey"}`
      }}
    >
      <input
        type="checkbox"
        // className="absolute opacity-0 w-0 h-0"
        style={{
          position: "absolute",
          opacity: 0,
          width: 0,
          height: 0
        }}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(!checked)}
      />
      <span
        className={`${color} shadow-lg absolute transition-all delay-75 ${
          checked
            ? "rounded-full h-[86%] w-[50%] left-[46%]"
            : "rounded-full h-[86%] w-[50%] left-[0.1rem]"
        } cursor-pointer inline-block rounded-full shadow-inner`}
      />
    </label>
  );
};
