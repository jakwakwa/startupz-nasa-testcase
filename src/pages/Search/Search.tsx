import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Image,
  Grid,
  Center,
  Stack,
  Text,
  CardBody,
  Card,
  Heading,
  SimpleGrid,
  Box,
  HStack,
  Icon,
  Spinner,
  Flex,
  Select,
} from "@chakra-ui/react";
import { UilLocationPoint, UilShutter } from "@iconscout/react-unicons";

import axios, { AxiosError, AxiosResponse } from "axios";

import { Field, Form, Formik, FormikHelpers } from "formik";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { FieldProps } from "../../types/searchTypes";
import { arrayRange, validateName } from "../../utils/formHelpers";
import * as yup from "yup";
import { ISearchResults } from "../../types/ISearchResults";
import { IFormValues } from "../../types/IFormValues";
const { setLocale } = yup;
import imgFallback from "../../assets/images/image-load.png";
import imgError from "../../assets/images/nasa3.jpg";

setLocale({
  mixed: {
    notType: "the field is required",
    required: "the field is required",
    oneOf: "the field must have one of the following values: ${values}",
  },
});

const initialSearchFormValues: IFormValues = {
  name: "",
  dateStart: "",
  dateEnd: "",
};

const Search = () => {
  const [querySubmitted, setQuerySubmitted] = useState(false);
  const [queryResults, setQueryResults] = useState(initialSearchFormValues);

  const [data, setData] = useState<ISearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [uiLoading, setUiLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = "https://images-api.nasa.gov";

  const getSearchResults = async (query: IFormValues) => {
    try {
      setLoading(true);
      setQuerySubmitted(false);

      setUiLoading(true);
      const response: AxiosResponse = await axios.get(
        `${API_URL}/search?q=${query.name}&media_type=image${
          query.dateStart !== "" && query.dateEnd !== ""
            ? `&year_start=${query.dateStart}&year_end=${query.dateEnd}`
            : ""
        }`
      );
      setData(response.data.collection.items);
      setError(null);
    } catch (err: AxiosError | any) {
      setError(err?.message || { err: "Something went wrong" });
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  let yearFieldOptions: number[] = [];
  const currentYear = new Date().getFullYear();
  yearFieldOptions = arrayRange(2000, currentYear, 1);

  const searchSchema = yup.object().shape(
    {
      name: yup.string().required(),

      dateStart: yup
        .number()
        .min(1900)
        .max(currentYear)
        .when("dateEnd", (dateEnd: any) => {
          if (dateEnd > 1900 && dateEnd !== undefined) {
            return yup.number().required();
          } else {
            return yup.number().notRequired();
          }
        })
        .min(1900),
      dateEnd: yup
        .number()
        .max(currentYear)
        .when("dateStart", (dateStart: any, schema: yup.NumberSchema) => {
          if (dateStart > 0 && dateStart !== undefined) {
            return (
              dateStart &&
              schema
                .min(dateStart, "End Date can't be earlier than Start Date")
                .required()
            );
          } else {
            return yup.number().min(1900).notRequired();
          }
        }),
    },
    [["dateStart", "dateEnd"]]
  );

  return (
    <>
      <Formik
        initialValues={initialSearchFormValues}
        onSubmit={(values, actions: FormikHelpers<IFormValues>) => {
          getSearchResults(values);

          if (!loading) {
            setQueryResults(values);
            setTimeout(() => {
              actions.setSubmitting(false);
              setQuerySubmitted(true);
              setUiLoading(false);
            }, 3000);
          }
        }}
        validationSchema={searchSchema}
      >
        {(props) => (
          <Form role="form" style={{ width: "100%" }} aria-label="Search Form">
            <Grid>
              <Card
                p={["1rem", "1rem", "1.2rem", "1.3rem"]}
                mt={["1rem", "1rem", "3rem", "4rem"]}
                mb={["1rem", "1rem", "2rem", "2rem"]}
              >
                <SimpleGrid>
                  <Flex gap="15px" direction={{ base: "column", md: "row" }}>
                    <Box width={["100%", "100%", "40%", "50%"]}>
                      <Field name="name">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            isInvalid={
                              (form.errors.name && form.touched.name) || false
                            }
                          >
                            <FormLabel fontSize={"xs"}>Search</FormLabel>
                            <Input
                              role={"textbox"}
                              {...field}
                              placeholder="search for images"
                              _placeholder={{
                                opacity: 0.4,
                                color: "inherit",
                                fontSize: "0.9rem",
                                fontStyle: "italic",
                              }}
                              aria-label="Search Input"
                            />
                            <FormHelperText
                              fontSize={"0.5rem"}
                            ></FormHelperText>
                            <FormErrorMessage fontSize="xs">
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box width={["100%", "100%", "40%", "50%"]}>
                      <Flex gap="10px">
                        <Box width={["100%", "100%", "50%", "50%"]}>
                          <Field name="dateStart">
                            {({ field, form }: FieldProps) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.dateStart &&
                                    form.touched.dateStart) ||
                                  false
                                }
                              >
                                <FormLabel fontSize={"xs"}>
                                  Start Date
                                </FormLabel>
                                <Select
                                  {...field}
                                  role={"combobox"}
                                  style={{
                                    opacity: "0.1 !important",
                                    color: "inherit",
                                    fontSize: "0.8rem",
                                  }}
                                  aria-label="Date Start Field"
                                  defaultValue={undefined}
                                >
                                  <option disabled value={""}>
                                    Select year
                                  </option>
                                  {yearFieldOptions?.map((year) => (
                                    <option key={year} value={year}>
                                      {year.toString()}
                                    </option>
                                  ))}
                                </Select>
                                <FormHelperText fontSize={"0.5rem"}>
                                  Optional
                                </FormHelperText>
                                <FormErrorMessage fontSize="xs">
                                  {form.errors.dateStart}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Box>
                        <Box width={["100%", "100%", "50%", "50%"]}>
                          <Field name="dateEnd">
                            {({ field, form }: FieldProps) => (
                              <FormControl
                                isInvalid={
                                  (form.errors.dateEnd &&
                                    form.touched.dateEnd) ||
                                  false
                                }
                              >
                                <FormLabel fontSize={"xs"}>End Date</FormLabel>
                                <Select
                                  {...field}
                                  role={"combobox"}
                                  style={{
                                    opacity: "0.1 !important",
                                    color: "inherit",
                                    fontSize: "0.8rem",
                                  }}
                                  aria-label="Date End Field"
                                  defaultValue={undefined}
                                >
                                  <option disabled value="">
                                    Select year
                                  </option>
                                  {yearFieldOptions?.map((year) => (
                                    <option key={year} value={year}>
                                      {year.toString()}
                                    </option>
                                  ))}
                                </Select>
                                <FormHelperText fontSize={"0.5rem"}>
                                  Optional
                                </FormHelperText>

                                <FormErrorMessage
                                  role="container"
                                  fontSize="xs"
                                  className="dateEndError"
                                  aria-label="Date End Error"
                                >
                                  {form.errors.dateEnd}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Box>
                      </Flex>
                    </Box>

                    <Box
                      mt={["0px", "10px", "32px", "32px"]}
                      alignSelf="flex-start"
                      width={["100%", "100%", "20%", "19%"]}
                    >
                      <Button
                        role={"button"}
                        width="100%"
                        colorScheme="purple"
                        isLoading={props.isSubmitting}
                        type="submit"
                        aria-label="submit"
                      >
                        Search
                      </Button>
                    </Box>
                  </Flex>
                </SimpleGrid>
              </Card>
            </Grid>
          </Form>
        )}
      </Formik>
      {uiLoading ? (
        <Box margin={["1rem", "3rem"]}>
          <Stack align={"center"} spacing="5">
            <Text>
              <b>Searching for media collections ... </b>
            </Text>
            <Spinner />
          </Stack>
        </Box>
      ) : null}
      {querySubmitted && !loading && data ? (
        <>
          <Flex
            w="100%"
            gap={"10px"}
            justifyContent={"flex-start"}
            pt={["1.5rem", "1.5rem", "2rem", "2rem"]}
            pb={["1.5rem", "1.5rem", "2rem", "2rem"]}
          >
            <Heading textAlign="left" size="md">
              Search Results:
            </Heading>
            <Text textAlign="left"> "{queryResults.name}"</Text>
          </Flex>

          <SimpleGrid
            columns={[1, 2, 3, 4]}
            gap={"20px"}
            padding={["20px", "10px", "50px", "0px"]}
          >
            {data?.map(
              (item: {
                data: {
                  photographer: string | undefined;
                  nasa_id: string | undefined;
                  title: string | undefined;
                  location: string | undefined;
                }[];
                links: { href: string | undefined }[];
              }) => (
                <Box key={item.data[0].nasa_id} width="100%">
                  <Link to={`/show/${item.data[0].nasa_id}`}>
                    <Card
                      height={["300px", "320px", "330px", "380px"]}
                      variant="elevated"
                      overflow={"hidden"}
                    >
                      <CardBody>
                        <Box>
                          <Center>
                            <Image
                              borderRadius="lg"
                              objectFit="cover"
                              width="100%"
                              height={["120px", "120px", "130px", "170px"]}
                              fallbackSrc={`${imgFallback}`}
                              src={`${
                                item.links[0].href
                                  ? item.links[0].href
                                  : !item.links[0].href
                                  ? imgError
                                  : null
                              }`}
                            />
                          </Center>
                        </Box>

                        <Stack mt="6" spacing="2">
                          <Heading
                            style={{
                              display: "-webkit-box",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                            textAlign={"left"}
                            size="xs"
                          >
                            {item.data[0].title}
                          </Heading>
                          <HStack>
                            <Icon as={UilLocationPoint} />
                            <Text
                              style={{
                                textOverflow: "ellipsis",

                                overflow: "hidden",
                                whiteSpace: "nowrap",
                              }}
                              fontSize="xs"
                            >
                              {item.data[0].location
                                ? item.data[0].location
                                : "N/A"}
                            </Text>
                          </HStack>
                          <HStack>
                            <Icon as={UilShutter} />
                            <Text
                              style={{
                                textOverflow: "ellipsis",

                                overflow: "hidden",
                                whiteSpace: "nowrap",
                              }}
                              textAlign="left"
                              fontSize="xs"
                            >
                              {item.data[0].photographer
                                ? item.data[0].photographer
                                : "N/A"}
                            </Text>
                          </HStack>
                        </Stack>
                      </CardBody>
                    </Card>
                  </Link>
                </Box>
              )
            )}
          </SimpleGrid>
        </>
      ) : null}

      {querySubmitted && !loading && data?.length === 0 ? (
        <Box margin="3rem">
          <Stack align={"center"} spacing="5">
            <Text>
              <b>No results found for your search</b>
            </Text>
          </Stack>
        </Box>
      ) : null}
    </>
  );
};

export default Search;
