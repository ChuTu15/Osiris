package backend.osiris.dto.inventory;

import backend.osiris.dto.address.AddressRequest;
import lombok.Data;
import org.springframework.lang.Nullable;

@Data
public class DestinationRequest {
    @Nullable
    private String contactFullname;
    @Nullable
    private String contactEmail;
    @Nullable
    private String contactPhone;
    private AddressRequest address;
    private Integer status;
}
