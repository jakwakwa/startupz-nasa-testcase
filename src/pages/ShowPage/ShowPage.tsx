import {
  Box,
  Card,
  Container,
  Text,
  Image,
  Flex,
  Stack,
  Heading,
  Button,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import axios, { AxiosResponse, AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
// import { Img } from "@chakra-ui/react";
import imgUrl from "../../assets/images/img-load-02.gif";
import {
  UilLocationPoint,
  UilShutter,
  UilCalendarAlt,
} from "@iconscout/react-unicons";

interface IAssetData {
  date_created: any;
  description: any;
  keywords: any;
  location: any;
  nasa_id: any;
  title: any;
  media_type: any;
  center: any;
  secondary_creator: any;
  photographer: any;
}

interface ICollection {
  collection: {
    items: [data: [IAssetData]];
  };
}

const ShowPage = () => {
  const [querySubmitted, setQuerySubmitted] = useState(false);

  const [assetData, setAssetData] = useState<IAssetData | null>(null);
  const [imgData, setImgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = "https://images-api.nasa.gov";
  let params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getShowResults = async (queryId: string | undefined) => {
      try {
        setLoading(true);
        setQuerySubmitted(false);
        const response: AxiosResponse = await axios.get(
          `${API_URL}/asset/${queryId}`
        );
        const responseData = response.data;
        setImgData(responseData.collection.items[0].href);
        setError(null);
      } catch (err: AxiosError | any) {
        setError(err?.message || { err: "Something went wrong" });
        setImgData(null);
      } finally {
        setLoading(false);
      }
    };
    getShowResults(params.showId);
  }, []);

  useEffect(() => {
    const getLocation = async (queryId: string | undefined) => {
      try {
        setLoading(true);
        setQuerySubmitted(false);

        const response: AxiosResponse = await axios.get(
          `${API_URL}/search?q=${queryId}`
        );
        setAssetData(response.data.collection.items[0].data[0]);
        setError(null);
      } catch (err: AxiosError | any) {
        setError(err?.message || { err: "Something went wrong" });
        setAssetData(null);
      } finally {
        setLoading(false);
      }
    };

    getLocation(params.showId);
  }, []);

  return (
    <Container w="100%" maxW={"1200px"} centerContent pt="5rem" pb="5rem">
      <Box w={"100% "}>
        <Flex justify="space-between">
          <Heading size={"xl"}>SHOW PAGE</Heading>

          <Button
            onClick={() => navigate("/")}
            width="1fr"
            colorScheme="purple"
            type="button"
          >
            Back
          </Button>
        </Flex>
        {assetData !== null || !loading ? (
          <Card mt="2rem" p={["10px", "40px", "40px", "40px"]}>
            <Flex
              direction={["column", "column-reverse", "row", "row"]}
              gap="20px"
            >
              {assetData === null || loading ? (
                <Spinner color="white" />
              ) : (
                <Image
                  shadow="lg"
                  borderRadius="lg"
                  objectFit="cover"
                  width={["100%", "100%", "40%", "50%"]}
                  height={["auto"]}
                  fallbackSrc={`${imgUrl}`}
                  src={`${imgData}`}
                />
              )}

              <Box p={["50px", "20px", "40px", "40px"]}>
                <Stack>
                  <Heading fontSize={"xl"}>{assetData?.title}</Heading>

                  <Flex
                    direction="row"
                    gap="10px"
                    pt="10px"
                    alignItems={"center"}
                  >
                    <Icon as={UilLocationPoint} />

                    <Text fontSize={"xs"} fontWeight={"normal"}>
                      {" "}
                      {assetData?.center}
                    </Text>
                  </Flex>
                  <Flex direction="row" gap="10px" pt="0px" align={"center"}>
                    <Icon as={UilShutter} />

                    <Text fontSize={"xs"} fontWeight={"normal"}>
                      {" "}
                      {assetData?.photographer
                        ? assetData?.photographer
                        : assetData?.secondary_creator
                        ? assetData?.secondary_creator
                        : "N/A"}
                    </Text>
                  </Flex>
                  <Flex
                    direction={"row"}
                    gap="10px"
                    pt="0px"
                    alignItems={"center"}
                  >
                    <Icon as={UilCalendarAlt} />

                    <Text fontSize={"xs"} fontWeight={"normal"}>
                      {moment(assetData?.date_created).format("MMMM Do YYYY")}
                    </Text>
                  </Flex>
                  <Flex direction={"column"} gap="10px" pt="20px">
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                      Description:{" "}
                    </Text>
                    <Text fontSize={"xs"} fontWeight={"normal"}>
                      {" "}
                      {assetData?.description}
                    </Text>
                  </Flex>
                </Stack>
              </Box>
            </Flex>
          </Card>
        ) : (
          <Box>{error}</Box>
        )}
      </Box>
    </Container>
  );
};

export default ShowPage;
