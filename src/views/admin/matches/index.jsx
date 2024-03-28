import { Avatar, Box, Flex, FormLabel, Icon, Image, Select, SimpleGrid, useColorModeValue, } from "@chakra-ui/react";

import MiniCalendar from "components/calendar/MiniCalendar";
import React from "react";
import CheckTable from "views/admin/matches/components/CheckTable";
import { columnsDataCheck, columnsDataComplex, } from "views/admin/matches/variables/columnsData";
import tableDataCheck from "views/admin/matches/variables/tableDataCheck.json";

export default function UserReports() {

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

            <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>

                <MiniCalendar h='100%' w='100%' selectRange={false} />
                <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />

            </SimpleGrid>

        </Box>
    );
}
