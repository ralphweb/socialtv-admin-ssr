<template>
  <div class="admin p-4">
    <h2 class="text-light">Planes</h2>
    <!--Button and find -->
    <b-row>
      <b-col lg="6" v-bind:class="{ 'my-3': true }">
        <b-button
          class="btn-warning float-left"
          size="lg"
          v-b-modal.plans-create-plan
          >Crear Plan</b-button
        >
      </b-col>
      <b-col lg="6" v-bind:class="{ 'my-3': true }">
        <b-form-group
          label-for="filter-input"
          label-cols-sm="12"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Filtrar por planes"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Limpiar</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <!--[END]Button and find -->

    <!--Table Plans-->
    <b-row>
      <b-col cols="12" v-bind:class="{ 'my-3': true }">
        <b-table
          id="list-plan-table"
          striped
          dark
          hover
          :filter="filter"
          :items="items"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <!--Format price in dolar-->
          <template #cell(price)="row">
            ${{ formatPrice(row.item.price) }}</template
          >
          <!--Active o inactive plan-->
          <template #cell(active)="row">
            <toggle-button
              v-model="row.item.active"
              color="#FF007A"
              :sync="true"
              :labels="{ checked: 'Activo', unchecked: 'Inactivo' }"
              :width="80"
              @change="saveToggle(row.item._id, 'active', row.item.active)"
            />
          </template>

          <!--Active o inactive plan-->
          <template #cell(actions)="row">
            <b-button class="btn-warning" @click="showModalEdit(row)"
              >Editar</b-button
            >
          </template>
        </b-table>
        <b-pagination
          @change="onPageChanged"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"
          v-bind:class="{ 'my-0': true }"
        ></b-pagination>
      </b-col>
    </b-row>
    <!--[END] table Plans-->

    <!--Call Componentes--->
    <b-row>
      <createplan />
      <editPlan :dataPlan="planEdit" />
    </b-row>
  </div>
</template>

<script>
import createplan from "../../components/plans/CreatePlan.vue";
import editPlan from "../../components/plans/EditPlan.vue";
export default {
  middleware: "authenticated",
  components: {
    createplan,
    editPlan,
  },
  data() {
    return {
      planEdit: null,
      fields: [
        { key: "name", label: "Nombre", sortable: true },
        { key: "active", label: "Activo", sortable: true },
        {
          key: "price",
          label: "Precio $",
          sortable: true,
          tdClass: "functions",
        },
        {
          key: "max_rooms",
          label: "N° salas",
          sortable: false,
          tdClass: "functions",
        },
        {
          key: "max_users",
          label: "N° usuarios",
          sortable: false,
          tdClass: "functions",
        },
        {
          key: "max_participants",
          label: "N° participantes",
          sortable: false,
          tdClass: "functions",
        },
        {
          key: "max_gsc",
          label: "N° gsc",
          sortable: false,
          tdClass: "functions",
        },
        {
          key: "max_polls",
          label: "N° polls",
          sortable: false,
          tdClass: "functions",
        },
        {
          key: "max_multimedia",
          label: "N° multimedia",
          sortable: false,
          tdClass: "functions",
        },
        { key: "actions", label: "Herramientas", sortable: false },
      ],
      items: [],
      filter: null,
      perPage: 5,
      currentPage: 1,
      totalRows: 0,
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async saveToggle(id, field, value) {
      let newValues = {};
      newValues[field] = value;
      const response = await this.$axios.put("/api/plan/" + id, newValues);
      if (response.status === 200) {
        this.$swal.fire(
          "Excelente!",
          "Plan actualizado de manera correcta",
          "success"
        );
      } else {
        this.$swal.fire(
          "Ups!",
          "No se pudo actualizar el plan... contacta al administrador",
          "info"
        );
      }
    },
    showModalEdit(dataPlan) {
      this.planEdit = dataPlan.item;
      this.$bvModal.show("plans-edit-plan");
    },

    // onPageChanged and paginate are function for change page
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },
    paginate(page_size, page_number) {
      let itemsToParse = this.items;
      this.paginatedItems = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    callPlans() {
      this.$axios
        .get("/api/plan")
        .then((result) => {
          if (result.data.length > 0) {
            this.items = result.data;
            this.totalRows = result.data.length;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  async mounted() {
    this.callPlans();
  },
};
</script>


<style lang="scss">
@import "@/imports/variables";

.table > :not(caption) > * > * {
  vertical-align: middle;
  position: relative;
}

.pagination {
  .page-item {
    .page-link {
      background-color: #212529;
      border-color: #2e3338;
      color: white;
    }

    &.active {
      .page-link {
        background-color: #2e3338;
        border-color: #2e3338;
        color: $maincolor;
      }
    }
  }
}

#editing {
  backdrop-filter: blur(5px);

  .modal-content {
    background-color: #141414 !important;
    color: #ddd;
    border: 1px solid #333;

    .modal-header,
    .modal-footer {
      border-bottom: 1px solid #333;
      border-top: 1px solid #333;
    }

    strong {
      color: $maincolor;
    }

    input,
    select {
      background-color: #000 !important;
      border: none;
      color: white;
    }
  }

  .pass {
    background-color: #2e3338;
    padding: 15px;
    border-radius: 15px;
  }
}
</style>