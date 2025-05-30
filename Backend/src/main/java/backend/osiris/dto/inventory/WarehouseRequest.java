package backend.osiris.dto.inventory;

import backend.osiris.dto.address.AddressRequest;
import lombok.Data;
import org.springframework.lang.Nullable;

@Data
public class WarehouseRequest {
    private String code;
    private String name;
    @Nullable
    private AddressRequest address;
    private Integer status;
}
