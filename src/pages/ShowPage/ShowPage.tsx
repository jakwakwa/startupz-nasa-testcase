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
  Grid,
  SimpleGrid,
  CardBody,
  Center,
} from "@chakra-ui/react";
import axios, { AxiosResponse, AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
// import { Img } from "@chakra-ui/react";
import imgUrl from "../../assets/images/image-load.png";
import {
  UilLocationPoint,
  UilShutter,
  UilCalendarAlt,
  UilTag,
} from "@iconscout/react-unicons";
import imgError from "../../assets/images/nasa3.jpg";
interface IAssetData {
  date_created: any;
  description: any;
  keywords: any;
  location: any;
  album?: string[];
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

interface IAlbum {
  links: { href: string }[];
}

const ShowPage = () => {
  const [assetData, setAssetData] = useState<IAssetData | null>(null);
  const [album, setAlbum] = useState<IAlbum[] | null>(null);
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
        const response: AxiosResponse = await axios.get(
          `${API_URL}/asset/${queryId}`
        );
        const responseData = response.data;
        setImgData(responseData.collection.items[3].href);
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
    const getAlbumResults = async (queryId: string | undefined) => {
      try {
        setLoading(true);
        const response: AxiosResponse = await axios.get(
          `${API_URL}/album/${assetData?.album}`
        );
        const responseData = response.data.collection.items;
        setAlbum(responseData);
        setError(null);
      } catch (err: AxiosError | any) {
        setError(err?.message || { err: "Something went wrong" });
        setAlbum(null);
      } finally {
        setLoading(false);
      }
    };
    if (assetData?.album) {
      getAlbumResults(assetData?.album[0]);
    }
  }, [assetData]);

  useEffect(() => {
    const getLocation = async (queryId: string | undefined) => {
      try {
        setLoading(true);
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
              {!loading ? (
                <Image
                  shadow="lg"
                  borderRadius="lg"
                  objectFit="cover"
                  width={["100%", "100%", "40%", "50%"]}
                  height={["auto"]}
                  maxH="500px"
                  fallbackSrc={`${imgUrl}`}
                  src={`${imgData ? imgData : !imgData ? imgError : null}`}
                />
              ) : null}

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
                  <Box pb="20px">
                    {" "}
                    <Text fontSize={"0.6rem"} fontWeight={"bold"}>
                      Keywords:{" "}
                    </Text>
                    <Flex direction={"row"} gap="5px" flexWrap={"wrap"}>
                      {assetData?.keywords.map((keyword: any) => {
                        return (
                          <Card p={["2px", "3px", "3px", "3px"]}>
                            <Flex
                              direction={"row"}
                              alignItems={"center"}
                              justify="center"
                              gap="3px"
                              p={["2px", "3px", "3px", "3px"]}
                            >
                              <Box>
                                <Icon fontSize="0.6rem" as={UilTag} />
                              </Box>

                              <Box>
                                <Text
                                  key={keyword}
                                  color="purple.500"
                                  fontSize="0.6rem"
                                  fontWeight="light"
                                  mr="5px"
                                >
                                  {keyword}
                                </Text>
                              </Box>
                            </Flex>
                          </Card>
                        );
                      })}
                    </Flex>
                  </Box>
                  {album ? (
                    <Box width={"100%"}>
                      <Text fontSize={"sm"} fontWeight={"bold"}>
                        From Album:
                      </Text>
                      <Text fontSize={"sm"} fontWeight={"normal"}>
                        {assetData?.album}
                      </Text>
                      <Text mt="10px" fontSize={"xs"} fontWeight={"light"}>
                        Other photos from this album:
                      </Text>
                    </Box>
                  ) : null}
                  <SimpleGrid
                    columns={[2, 3, 3, 3]}
                    gap={"10px"}
                    padding={["20px", "10px", "50px", "10px"]}
                  >
                    {album ? (
                      album?.map((item, index) => {
                        return (
                          <Box key={index} width="100%">
                            <Card
                              height={["300px", "110px", "150px", "180px"]}
                              variant="elevated"
                              overflow={"hidden"}
                              p={["10px", "10px", "10px", "10px"]}
                            >
                              <Image
                                shadow="sm"
                                borderRadius={"md"}
                                objectFit="cover"
                                width={["100%", "100%", "100%", "100%"]}
                                height={["90px", "90px", "130px", "160px"]}
                                fallbackSrc={`${imgUrl}`}
                                src={`${
                                  item.links !== undefined
                                    ? item.links[0].href
                                    : imgError
                                }`}
                              />
                            </Card>
                          </Box>
                        );
                      })
                    ) : (
                      <Box>
                        <Text fontSize={"sm"} fontWeight={"bold"}>
                          No Album Found
                        </Text>
                      </Box>
                    )}
                  </SimpleGrid>
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
