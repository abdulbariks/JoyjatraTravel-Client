"use client";

import DataTable from "@/components/shared/table/DataTable";
import {
  DataTableFilterConfig,
  DataTableFilterValues,
} from "@/components/shared/table/DataTableFilters";
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { PaginationMeta } from "@/types/api.types";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { IModerator } from "@/types/moderator.types";
import { getModerators } from "@/services/moderator.serveice";
import { ModeratorColumns } from "./ModeratorColumns";
import CreateModeratorFormModal from "./CreateModeratorFormModal";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const SPECIALTIES_FILTER_KEY = "specialties.specialty.title";
const APPOINTMENT_FEE_FILTER_KEY = "appointmentFee";
const DOCTOR_FILTER_DEFINITIONS = [
  serverManagedFilter.single("gender"),
  serverManagedFilter.multi(SPECIALTIES_FILTER_KEY),
  serverManagedFilter.range(APPOINTMENT_FEE_FILTER_KEY),
];

export const ModeratorTable = ({
  initialQueryString,
}: {
  initialQueryString: string;
}) => {
  const searchParams = useSearchParams();
  const {
    viewingItem,
    editingItem,
    deletingItem,
    isViewDialogOpen,
    isEditModalOpen,
    isDeleteDialogOpen,
    onViewOpenChange,
    onEditOpenChange,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<IModerator>();

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  });

  const queryString = queryStringFromUrl || initialQueryString;

  const { searchTermFromUrl, handleDebouncedSearchChange } =
    useServerManagedDataTableSearch({
      searchParams,
      updateParams,
    });

  const { filterValues, handleFilterChange, clearAllFilters } =
    useServerManagedDataTableFilters({
      searchParams,
      definitions: DOCTOR_FILTER_DEFINITIONS,
      updateParams,
    });

  const {
    data: moderatorDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["moderators", queryString],
    queryFn: () => getModerators(queryString),
  });

  const moderators = moderatorDataResponse?.data ?? [];
  console.log(moderators);

  const meta: PaginationMeta | undefined = moderatorDataResponse?.meta;
  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "gender",
        label: "Gender",
        type: "single-select",
        options: [
          { label: "Male", value: "MALE" },
          { label: "Female", value: "FEMALE" },
          { label: "Other", value: "OTHER" },
        ],
      },

      //   {
      //     id: "appointmentFee",
      //     label: "Fee Range",
      //     type: "range",
      //   },
    ];
  }, []);

  const filterValuesForTable = useMemo<DataTableFilterValues>(() => {
    return {
      gender: filterValues.gender,
      [SPECIALTIES_FILTER_KEY]: filterValues[SPECIALTIES_FILTER_KEY],
      appointmentFee: filterValues[APPOINTMENT_FEE_FILTER_KEY],
    };
  }, [filterValues]);

  return (
    <>
      <DataTable
        data={moderators}
        columns={ModeratorColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No moderators found."
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        search={{
          initialValue: searchTermFromUrl,
          placeholder: "Search doctor by name, email...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValuesForTable,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        toolbarAction={<CreateModeratorFormModal />}
        meta={meta}
        actions={tableActions}
      />

      {/* <EditModeratorFormModal
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        moderator={editingItem}
      /> */}

      {/* <DeleteModeratorConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        moderator={deletingItem}
      /> */}

      {/* <ViewModeratorProfileDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        moderator={viewingItem}
      /> */}
    </>
  );
};
