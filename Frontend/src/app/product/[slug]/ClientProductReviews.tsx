'use client";';
import ReviewStarGroup from "@/components/ReviewStarGroup";
import ApplicationConstants from "@/constants/ApplicationConstants";
import ResourceURL from "@/constants/ResourceURL";
import { ClientSimpleReviewResponse } from "@/datas/ClientUI";
import DateUtils from "@/utils/DateUtils";
import FetchUtils, { ListResponse, ErrorMessage } from "@/utils/FetchUtils";
import NotifyUtils from "@/utils/NotifyUtils";
import {
    Alert,
    Avatar,
    Badge,
    Box,
    Card,
    Group,
    Pagination,
    Skeleton,
    Stack,
    Text,
    Title,
    useMantineTheme,
} from "@mantine/core";
import { use, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, AlertTriangle, Edit, Messages } from "tabler-icons-react";

interface ClientProductReviewsProps {
    productSlug: string;
}

function ClientProductReviews({ productSlug }: ClientProductReviewsProps) {
    const theme = useMantineTheme();

    const [activePage, setActivePage] = useState(1);

    const {
        reviewResponses,
        isLoadingReviewResponses,
        isErrorReviewResponses,
    } = useGetAllReviewsByProduct(productSlug, activePage);
    const reviews = reviewResponses as ListResponse<ClientSimpleReviewResponse>;

    let reviewsContentFragment;

    if (isLoadingReviewResponses) {
        reviewsContentFragment = (
            <Stack>
                {Array(5)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} height={50} radius="md" />
                    ))}
            </Stack>
        );
    }

    if (isErrorReviewResponses) {
        reviewsContentFragment = (
            <Stack
                my={theme.spacing.xl}
                sx={{ alignItems: "center", color: theme.colors.pink[6] }}
            >
                <AlertTriangle size={125} strokeWidth={1} />
                <Text size="xl" weight={500}>
                    Đã có lỗi xảy ra
                </Text>
            </Stack>
        );
    }

    if (reviews && reviews.totalElements === 0) {
        reviewsContentFragment = (
            <Alert
                icon={<AlertCircle size={16} />}
                title="Thông báo"
                color="cyan"
                radius="md"
            >
                Sản phẩm hiện không có đánh giá nào
            </Alert>
        );
    }

    if (reviews && reviews.totalElements > 0) {
        reviewsContentFragment = (
            <Stack>
                <Stack>
                    {reviews.content.map((review) => (
                        <Card
                            key={review.reviewId}
                            radius="md"
                            shadow="sm"
                            p="lg"
                        >
                            <Stack>
                                <Group spacing="lg">
                                    <Group spacing="xs">
                                        <Avatar
                                            color="cyan"
                                            size="sm"
                                            radius="md"
                                        >
                                            {review.reviewUser.userFullname.charAt(
                                                0,
                                            )}
                                        </Avatar>
                                        <Text size="sm" weight={500}>
                                            {review.reviewUser.userFullname}
                                        </Text>
                                    </Group>
                                    <Text size="sm" color="dimmed">
                                        {DateUtils.isoDateToString(
                                            review.reviewCreatedAt,
                                        )}
                                    </Text>
                                    <ReviewStarGroup
                                        ratingScore={review.reviewRatingScore}
                                    />
                                </Group>
                                <Text size="sm">{review.reviewContent}</Text>
                                {review.reviewReply && (
                                    <Box
                                        sx={{
                                            backgroundColor:
                                                theme.colorScheme === "dark"
                                                    ? theme.colors.dark[5]
                                                    : theme.colors.gray[0],
                                            borderRadius: theme.radius.md,
                                            padding: "16px 20px",
                                        }}
                                    >
                                        <Stack spacing="xs">
                                            <Group spacing="xs">
                                                <Messages size={14} />
                                                <Text size="sm" weight={500}>
                                                    Phản hồi từ cửa hàng
                                                </Text>
                                            </Group>
                                            <Text size="sm">
                                                {review.reviewReply}
                                            </Text>
                                        </Stack>
                                    </Box>
                                )}
                            </Stack>
                        </Card>
                    ))}
                </Stack>
                <Group position="apart" mt={theme.spacing.md}>
                    <Pagination
                        page={activePage}
                        total={reviews.totalPages}
                        onChange={(page: number) =>
                            page !== activePage && setActivePage(page)
                        }
                    />
                    <Text>
                        <Text component="span" weight={500}>
                            Trang {activePage}
                        </Text>
                        <span> / {reviews.totalPages}</span>
                    </Text>
                </Group>
            </Stack>
        );
    }

    return (
        <Stack>
            <Group position="apart">
                <Group spacing="xs">
                    <Edit />
                    <Title order={2}>Đánh giá sản phẩm</Title>
                </Group>
                {reviews && reviews.totalElements > 0 && (
                    <Badge size="lg" ml="xs" variant="filled">
                        {reviews.totalElements}
                    </Badge>
                )}
            </Group>

            {reviewsContentFragment}
        </Stack>
    );
}

function useGetAllReviewsByProduct(productSlug: string, activePage: number) {
    const requestParams = {
        page: activePage,
        size: ApplicationConstants.DEFAULT_CLIENT_PRODUCT_REVIEW_PAGE_SIZE,
        filter: "status==2",
    };

    const {
        data: reviewResponses,
        isLoading: isLoadingReviewResponses,
        isError: isErrorReviewResponses,
    } = useQuery<ListResponse<ClientSimpleReviewResponse>, ErrorMessage>({
        queryKey: [
            "client-api",
            "reviews/products",
            "getAllReviewsByProduct",
            productSlug,
            requestParams,
        ],
        queryFn: () =>
            FetchUtils.get(
                ResourceURL.CLIENT_REVIEW_PRODUCT + "/" + productSlug,
                requestParams,
            ),

        refetchOnWindowFocus: false,
        placeholderData: (previousData) => previousData,
    });

    useEffect(() => {
        if (isErrorReviewResponses) {
            NotifyUtils.simpleFailed("Lấy dữ liệu không thành công");
        }
    }, [isErrorReviewResponses]);

    return {
        reviewResponses,
        isLoadingReviewResponses,
        isErrorReviewResponses,
    };
}

export default ClientProductReviews;
