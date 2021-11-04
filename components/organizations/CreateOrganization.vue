<template>
  <div class="admin p-4">
    <b-row>
      <b-modal
        class="backdropblur"
        size="xl"
        id="organization-create"
        title="Creando una organización"
      >
        <b-row>
          <!-- Name of the organization-->
          <b-col cols="12">
            <b-form-group
              id="name-organization"
              label="Nombre"
              label-for="name-organization"
            >
              <b-form-input
                id="name-organization"
                name="name-organization"
                v-model="dataOrganization.name"
                placeholder="Nombre de la organización Ejemplo: Social Hound"
                v-validate="{ required: true, min: 3 }"
                :state="validateState('name-organization')"
                aria-describedby="input-1-live-feedback"
                data-vv-as="Nombre de la organización"
              >
              </b-form-input>

              <b-form-invalid-feedback id="input-1-live-feedback">{{
                veeErrors.first("name-organization")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Active or not-->
          <b-col cols="12">
            <b-form-group
              id="example-input-2"
              label="¿Organización activa?"
              label-for="example-input-2"
            >
              <b-form-select
                id="example-input-2"
                name="example-input-2"
                v-model="dataOrganization.active"
                v-validate="{ required: true }"
                :options="activesOption"
                :state="validateState('example-input-2')"
                aria-describedby="input-2-live-feedback"
                data-vv-as="Activo"
              ></b-form-select>

              <b-form-invalid-feedback id="input-2-live-feedback">{{
                veeErrors.first("example-input-2")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!--Select one plan-->
          <b-col cols="12">
            <b-form-group
              id="example-input-3"
              label="Seleccione un plan"
              label-for="example-input-3"
            >
              <b-form-select
                id="active-1"
                name="example-input-3"
                v-model="dataOrganization.plan"
                :options="dataPlans"
                v-validate="{ required: true }"
                :state="validateState('example-input-3')"
                aria-describedby="input-3-live-feedback"
                data-vv-as="Plan"
              ></b-form-select>
              <b-button class="" variant="warning" @click="showPlanDetails()"
                >Ver detalle del plan</b-button
              >

              <b-form-invalid-feedback id="input-3-live-feedback">{{
                veeErrors.first("example-input-3")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <div slot="modal-footer">
          <b-btn
            class="float-right"
            variant="danger"
            @click="$bvModal.hide('organization-create')"
          >
            Cerrar
          </b-btn>

          <b-button
            type="button"
            @click="createOrganization()"
            variant="success"
            class="float-right mr-3"
            >Crear organización</b-button
          >
        </div>
      </b-modal>

      <!--Call others components-->
      <showPlan v-if="activePlanDetails" :plan="dataOrganization.plan" />
    </b-row>
  </div>
</template>


<script>
import showPlan from "./../plans/ShowPlan.vue";
export default {
  components: {
    showPlan,
  },
  data() {
    return {
      activesOption: [
        { text: "Activo", value: true },
        { text: "Inactivo", value: false },
      ],

      dataOrganization: {
        name: "",
        active: "",
        owner_id: this.$store.state.auth.id,
        plan: "",
      },

      //plans
      dataPlans: [],
      activePlanDetails: false,
    };
  },
  methods: {
    //the next function is for create a plan
    async createOrganization() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.dataOrganization.plan = this.dataOrganization.plan._id;
          this.$axios
            .post("/api/organization", this.dataOrganization)
            .then(() => {
              this.$swal.fire(
                "Creación exitosa",
                "Organización creado de manera correcta en el sistema",
                "success"
              );
              this.resetForm();
              this.$bvModal.hide("organization-create");
              this.$parent.callOrganization();
            })
            .catch(() => {
              this.$swal.fire(
                "Ups..",
                "Ocurrio un error.. favor contactar al administrador",
                "error"
              );
            });
        }
      });
    },
    async showPlanDetails() {
      this.activePlanDetails = true;
      this.$bvModal.show("show-plan-detail");
    },
    //this function is for validate form
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },

    // the next function is for reset form when the plan are created succesful
    resetForm() {
      this.dataOrganization = {
        name: "",
        active: true,
        owner_id: false,
        plan: "",
      };
    },
  },
  mounted() {
    this.$axios
      .get("/api/plan")
      .then((result) => {
        if (result.data.length > 0) {
          result.data.forEach((plan) => {
            console.log(plan.price * (plan.promo / 100));
            let newPrice =
              plan.promo > 0
                ? plan.price - plan.price * (plan.promo / 100)
                : plan.price;
            this.dataPlans.push({
              text: `Plan: ${plan.name}, precio : ${newPrice}, usuarios : ${plan.max_users}`,
              value: plan,
            });
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
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

#organization-create {
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