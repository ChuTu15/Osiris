import React from "react";
import {
    Button,
    Divider,
    Grid,
    Group,
    Paper,
    Select,
    Stack,
    TextInput,
} from "@mantine/core";
import { useParams } from "next/navigation";
import DistrictConfigs from "./DistrictConfigs";
import useDistrictUpdateViewModel from "./DistrictUpdate.vm";
import CreateUpdateTitle from "@/components/CreateUpdateTitle";
import DefaultPropertyPanel from "@/components/DefaultPropertyPanel";

function DistrictUpdate() {
    const { id } = useParams();
    const { district, form, handleFormSubmit, provinceSelectList } =
        useDistrictUpdateViewModel(Number(id));

    if (!district) {
        return null;
    }

    return (
        <Stack sx={{ maxWidth: 800 }}>
            <CreateUpdateTitle
                managerPath={DistrictConfigs.managerPath}
                title={DistrictConfigs.updateTitle}
            />

            <DefaultPropertyPanel
                id={district.id}
                createdAt={district.createdAt}
                updatedAt={district.updatedAt}
                createdBy="1"
                updatedBy="1"
            />

            <form onSubmit={handleFormSubmit}>
                <Paper shadow="xs">
                    <Stack spacing={0}>
                        <Grid p="sm">
                            <Grid.Col xs={6}>
                                <TextInput
                                    required
                                    label={
                                        DistrictConfigs.properties.name.label
                                    }
                                    {...form.getInputProps("name")}
                                />
                            </Grid.Col>
                            <Grid.Col xs={6}>
                                <TextInput
                                    required
                                    label={
                                        DistrictConfigs.properties.code.label
                                    }
                                    {...form.getInputProps("code")}
                                />
                            </Grid.Col>
                            <Grid.Col xs={6}>
                                <Select
                                    required
                                    label={
                                        DistrictConfigs.properties.provinceId
                                            .label
                                    }
                                    placeholder="--"
                                    searchable
                                    data={provinceSelectList}
                                    {...form.getInputProps("provinceId")}
                                />
                            </Grid.Col>
                        </Grid>

                        <Divider mt="xs" />

                        <Group position="apart" p="sm">
                            <Button variant="default" onClick={form.reset}>
                                Mặc định
                            </Button>
                            <Button type="submit">Cập nhật</Button>
                        </Group>
                    </Stack>
                </Paper>
            </form>
        </Stack>
    );
}

export default DistrictUpdate;
