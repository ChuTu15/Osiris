import { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { SelectOption } from "@/datas/SelectOption";
import useGetAllApi from "@/hooks/use-get-all-api";
import useGetByIdApi from "@/hooks/use-get-by-id-api";
import useUpdateApi from "@/hooks/use-update-api";
import { DistrictResponse, DistrictRequest } from "@/models/District";
import { ProvinceResponse } from "@/models/Province";
import MiscUtils from "@/utils/MiscUtils";
import ProvinceConfigs from "../province/ProvinceConfigs";
import DistrictConfigs from "./DistrictConfigs";

function useDistrictUpdateViewModel(id: number) {
    const form = useForm({
        initialValues: DistrictConfigs.initialCreateUpdateFormValues,
        schema: zodResolver(DistrictConfigs.createUpdateFormSchema),
    });

    const [district, setDistrict] = useState<DistrictResponse>();
    const [prevFormValues, setPrevFormValues] = useState<typeof form.values>();
    const [provinceSelectList, setProvinceSelectList] = useState<
        SelectOption[]
    >([]);

    const updateApi = useUpdateApi<DistrictRequest, DistrictResponse>(
        DistrictConfigs.resourceUrl,
        DistrictConfigs.resourceKey,
        id,
    );
    useGetByIdApi<DistrictResponse>(
        DistrictConfigs.resourceUrl,
        DistrictConfigs.resourceKey,
        id,
        (districtResponse) => {
            setDistrict(districtResponse);
            const formValues: typeof form.values = {
                name: districtResponse.name,
                code: districtResponse.code,
                provinceId: String(districtResponse.province.id),
            };
            form.setValues(formValues);
            setPrevFormValues(formValues);
        },
    );
    useGetAllApi<ProvinceResponse>(
        ProvinceConfigs.resourceUrl,
        ProvinceConfigs.resourceKey,
        { all: 1 },
        (provinceListResponse) => {
            const selectList: SelectOption[] = provinceListResponse.content.map(
                (item) => ({
                    value: String(item.id),
                    label: item.name,
                }),
            );
            setProvinceSelectList(selectList);
        },
    );

    const handleFormSubmit = form.onSubmit((formValues) => {
        setPrevFormValues(formValues);
        if (!MiscUtils.isEquals(formValues, prevFormValues)) {
            const requestBody: DistrictRequest = {
                name: formValues.name,
                code: formValues.code,
                provinceId: Number(formValues.provinceId),
            };
            updateApi.mutate(requestBody);
        }
    });

    return {
        district,
        form,
        handleFormSubmit,
        provinceSelectList,
    };
}

export default useDistrictUpdateViewModel;
