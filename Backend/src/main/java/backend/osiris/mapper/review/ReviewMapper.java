package backend.osiris.mapper.review;

import backend.osiris.dto.review.ReviewRequest;
import backend.osiris.dto.review.ReviewResponse;
import backend.osiris.entity.review.Review;
import backend.osiris.mapper.GenericMapper;
import backend.osiris.utils.MapperUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MapperUtils.class)
public interface ReviewMapper extends GenericMapper<Review, ReviewRequest, ReviewResponse> {

    @Override
    @Mapping(source = "userId", target = "user")
    @Mapping(source = "productId", target = "product")
    Review requestToEntity(ReviewRequest request);

    @Override
    @Mapping(source = "userId", target = "user")
    @Mapping(source = "productId", target = "product")
    Review partialUpdate(@MappingTarget Review entity, ReviewRequest request);

}
