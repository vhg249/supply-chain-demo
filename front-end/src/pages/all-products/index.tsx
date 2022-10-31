import { Heading, HStack, VStack } from "native-base";
import { Footer, Header, ProductCard } from "../../components";
import { useApiCall } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { Product } from "../../repository/interfaces";
import Fab from "../../components/fab";
import { ThreeCircles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { SupplyChainService } from "../../repository/supplyChain";
import { toastSuccess } from "../../utils/toastMessages";

export const AllProducts = () => {
  const { productListLoading, getProducts } = useApiCall();
  const { products } = useSelector((state: RootState) => state.generalReducer);
  const [productList, setProductList] = useState<Product[]>();
  const { isUserLoggedIn, searchedProducts } = useSelector(
    (state: RootState) => state.generalReducer
  );
    const testData: Product[] = [
      {
        manufacturerName: "vinamilk",
        manufacturer: "0x0d06Ce8b74BEf03d878E7e138Bab36B62e304866", //address
        name: "huong",
        isInBatch: true,
        batchCount: 1000,
        expDateEpoch: 1667014414,
        manDateEpoch: 1667014414,
        barcodeId: '3401345935571',
        productImage: 'https://www.vinamilk.com.vn/sua-tuoi-vinamilk/wp-content/uploads/2022/03/SN_b0.png',
        productType: 'BCG',
        scientificName:'sua Vinamilk',
        usage: 'uong binh thuong',
        composition: ['sua bo', 'duong'],
        sideEffects: ['khong co phan ung phu'],
      },
    ]
  useEffect(() => {
    // getProducts();
    // listenToEvent();
    setProductList(testData)
  }, []);

  const listenToEvent = async () => {
    SupplyChainService.getInstance()
      .getContract()
      .on(
        "newProduct",
        async (
          name,
          manufacturerName,
          scientificName,
          barcodeId,
          manDateEpoch,
          expDateEpoch,
          event
        ) => {
          console.log("name", event);
          getProducts();
          toastSuccess("New Product successfully added");
        }
      );
  };

  useEffect(() => {
    console.log(productList);
    
    // !productListLoading && setProductList(products);
  }, [productList]);

  // useEffect(() => {
  //   setProductList(searchedProducts);
  // }, [searchedProducts]);

  return (
    <VStack maxW="100vw" minH="100vh" bg="violet.50">
      <Header />
      <VStack w="100%" minH="85vh" alignItems="center" p="2">
        {/* {productListLoading ? (
          <HStack mt={20} justifyContent={"center"}>
            <ThreeCircles
              color="blue"
              height={110}
              width={110}
              ariaLabel="three-circles-rotating"
            />
          </HStack>
        ) : !productListLoading && productList && productList.length === 0 ? (
          <Heading mt={20}>No Products Found</Heading>
        ) : ( */}
          <HStack
            py={5}
            mt={[5, 20]}
            width={["100%", "96vw"]}
            alignItems="center"
            justifyContent={"flex-start"}
            flexWrap={"wrap"}
          >
            {productList &&
              productList.map((item: Product) => (
                <ProductCard key={item.barcodeId || Date.now()} item={item} />
              ))}
          </HStack>
        {/* )} */}
      </VStack>
      {isUserLoggedIn && <Fab />}
      <Footer />
    </VStack>
  );
};
