package backend.osiris.dto.client;

import lombok.Data;

@Data
public class ClientPromotionResponse {
    private Long promotionId;
    private Integer promotionPercent;
}