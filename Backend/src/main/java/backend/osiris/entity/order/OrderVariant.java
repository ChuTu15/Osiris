package backend.osiris.entity.order;

import backend.osiris.entity.product.Variant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(name = "order_variant")
public class OrderVariant {
    @EmbeddedId
    private OrderVariantKey orderVariantKey = new OrderVariantKey();

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @MapsId("variantId")
    @JoinColumn(name = "variant_id", nullable = false)
    private Variant variant;

    @Column(name = "price", nullable = false, columnDefinition = "DECIMAL(15,5)")
    private BigDecimal price;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "amount", nullable = false, columnDefinition = "DECIMAL(15,5)")
    private BigDecimal amount;
}