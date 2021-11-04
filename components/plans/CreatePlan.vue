<template>
  <div class="admin p-4">
    <b-row>
      <b-modal
        class="backdropblur"
        size="xl"
        id="plans-create-plan"
        title="Creación de Plans"
      >
        <b-row>
          <!-- Name of the plan-->
          <b-col cols="12">
            <b-form-group
              id="nombre-plan-1"
              label="Nombre del plan"
              label-for="nombre-plan-1"
            >
              <b-form-input
                id="nombre-plan-1"
                name="nombre-plan-1"
                v-model="dataPlan.name"
                placeholder=""
                v-validate="{ required: true, min: 3, alpha_spaces: true }"
                aria-describedby="input-1-live-feedback"
                :state="validateState('nombre-plan-1')"
                data-vv-as="Nombre del plan"
              >
              </b-form-input>

              <b-form-invalid-feedback id="input-1-live-feedback">{{
                veeErrors.first("nombre-plan-1")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- price of the plan-->
          <b-col cols="6">
            <b-form-group
              id="price-plan"
              label="Precio del plan en dolar"
              label-for="price-plan-1"
            >
              <b-input-group prepend="$">
                <b-form-input
                  id="price-plan-1"
                  name="price-plan-1"
                  v-model="dataPlan.price"
                  placeholder="Ingrese precio del plan..."
                  v-validate="{ required: true, min: 1, max: 6, numeric: true }"
                  aria-describedby="input-1-live-feedback"
                  :state="validateState('price-plan-1')"
                  data-vv-as="precio"
                ></b-form-input>
              </b-input-group>

              <b-form-invalid-feedback id="input-1-live-feedback">{{
                veeErrors.first("price-plan-1")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <!-- max rooms of the plan-->
          <b-col cols="6">
            <b-form-group
              id="max_rooms-plan"
              label="máximo de salas por plan"
              label-for="max_rooms-plan-1"
            >
              <b-input-group prepend="N°">
                <b-form-input
                  id="max_rooms-plan-1"
                  name="max_rooms-plan-1"
                  v-model="dataPlan.max_rooms"
                  placeholder="Ingrese cantidad de salas "
                  v-validate="{ required: true, min: 1, max: 6, numeric: true }"
                  aria-describedby="input-1-live-feedback"
                  :state="validateState('max_rooms-plan-1')"
                  data-vv-as="salas"
                ></b-form-input>
              </b-input-group>
              <b-form-invalid-feedback id="input-1-live-feedback">{{
                veeErrors.first("max_rooms-plan-1")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- max users of the plan-->
          <b-col cols="6">
            <b-form-group
              id="max_users-plan"
              label="máximo de usuarios por plan"
              label-for="max_users-plan-1"
            >
              <b-input-group prepend="N°">
                <b-form-input
                  id="max_users-plan-1"
                  name="max_users-plan-1"
                  v-model="dataPlan.max_users"
                  placeholder="Ingrese cantidad de usuarios "
                  v-validate="{ required: true, min: 1, max: 6, numeric: true }"
                  aria-describedby="input-1-live-feedback"
                  :state="validateState('max_users-plan-1')"
                  data-vv-as="máximo de usuarios"
                ></b-form-input>
              </b-input-group>

              <b-form-invalid-feedback id="input-1-live-feedback">{{
                veeErrors.first("max_users-plan-1")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <!-- max participantes of the plan-->
          <b-col cols="6">
            <b-form-group
              id="max_participants-plan"
              label="máximo de participantes por plan"
              label-for="max_participants-plan-1"
            >
              <b-input-group prepend="N°">
                <b-form-input
                  id="max_participants-plan-1"
                  name="max_participants-plan-1"
                  v-model="dataPlan.max_participants"
                  placeholder="Ingrese cantidad de participantes "
                  v-validate="{ required: true, min: 1, max: 6, numeric: true }"
                  aria-describedby="input-1-live-feedback"
                  :state="validateState('max_participants-plan-1')"
                  data-vv-as="máximo de participantes"
                ></b-form-input>
              </b-input-group>

              <b-form-invalid-feedback id="input-1-live-feedback">{{
                veeErrors.first("max_participants-plan-1")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- max scenes of the plan-->
          <b-col cols="6">
            <b-form-group
              id="max_scenes-plan"
              label="máximo de escenas por plan"
              label-for="max_scenes-plan-1"
            >
              <b-input-group prepend="N°">
                <b-form-input
                  id="max_scenes-plan-1"
                  name="max_scenes-plan-1"
                  v-model="dataPlan.max_scenes"
                  placeholder="Ingrese cantidad de escenas"
                  v-validate="{ required: true, min: 1, max: 6, numeric: true }"
                  aria-describedby="input-1-live-feedback"
                  :state="validateState('max_scenes-plan-1')"
                  data-vv-as="máximo de escenas"
                ></b-form-input>
              </b-input-group>
              <b-form-invalid-feedback id="input-1-live-feedback">{{
                veeErrors.first("max_scenes-plan-1")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <!-- max gsc of the plan-->
          <b-col cols="6">
            <b-form-group
              id="max_gsc-plan"
              label="máximo de gsc por plan"
              label-for="max_gsc-plan-1"
            >
              <b-input-group prepend="N°">
                <b-form-input
                  id="max_gsc-plan-1"
                  name="max_gsc-plan-1"
                  v-model="dataPlan.max_gsc"
                  placeholder="Ingrese cantidad de gsc"
                  v-validate="{ required: true, min: 1, max: 6, numeric: true }"
                  aria-describedby="input-1-live-feedback"
                  :state="validateState('max_gsc-plan-1')"
                  data-vv-as="máximo de gsc"
                ></b-form-input>
              </b-input-group>

              <b-form-invalid-feedback id="input-1-live-feedback">{{
                veeErrors.first("max_gsc-plan-1")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- max polls of the plan-->
          <b-col cols="6">
            <b-form-group
              id="max_polls-plan"
              label="máximo de encuestas por plan"
              label-for="max_polls-plan-1"
            >
              <b-input-group prepend="N°">
                <b-form-input
                  id="max_polls-plan-1"
                  name="max_polls-plan-1"
                  v-model="dataPlan.max_polls"
                  placeholder="Ingrese cantidad de encuestas"
                  v-validate="{ required: true, min: 1, max: 6, numeric: true }"
                  aria-describedby="input-1-live-feedback"
                  :state="validateState('max_polls-plan-1')"
                  data-vv-as="máximo de encuestas"
                ></b-form-input>
              </b-input-group>
              <b-form-invalid-feedback id="input-1-live-feedback">{{
                veeErrors.first("max_polls-plan-1")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <!-- max multimedia of the plan-->
          <b-col cols="6">
            <b-form-group
              id="max_multimedia-plan"
              label="máximo de multimedia por plan"
              label-for="max_multimedia-plan-1"
            >
              <b-input-group prepend="N°">
                <b-form-input
                  id="max_multimedia-plan-1"
                  name="max_multimedia-plan-1"
                  v-model="dataPlan.max_multimedia"
                  placeholder="Ingrese cantidad de multimedia"
                  v-validate="{ required: true, min: 1, max: 6, numeric: true }"
                  aria-describedby="input-1-live-feedback"
                  :state="validateState('max_multimedia-plan-1')"
                  data-vv-as="máximo de multimedia"
                ></b-form-input>
              </b-input-group>
              <b-form-invalid-feedback id="input-1-live-feedback">{{
                veeErrors.first("max_multimedia-plan-1")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- max promo of the plan-->
          <b-col cols="6">
            <b-form-group
              id="promo-plan"
              label="¿Plan con descuento?"
              label-for="promo-plan-1"
            >
              <b-input-group prepend="%">
                <b-form-input
                  id="promo-plan-1"
                  name="promo-plan-1"
                  v-model="dataPlan.promo"
                  placeholder="Ingrese % de descuento"
                  v-validate="{ required: false }"
                  aria-describedby="input-1-live-feedback"
                ></b-form-input>
              </b-input-group>
              <b-form-invalid-feedback id="input-1-live-feedback">{{
                veeErrors.first("promo-plan-1")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Active or not-->
          <b-col cols="6">
            <b-form-group
              id="active-plan"
              label="¿Plan activo?"
              label-for="nombre-plan-1"
            >
              <b-input-group prepend="¿Activo?">
                <b-form-select
                  id="active-1"
                  v-model="dataPlan.active"
                  :options="activesOption"
                  required
                ></b-form-select>
              </b-input-group>
              <b-form-invalid-feedback id="input-1-live-feedback">{{
                veeErrors.first("active-plan-1")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <div slot="modal-footer">
          <b-btn
            class="float-right"
            variant="danger"
            @click="$bvModal.hide('plans-create-plan')"
          >
            Close
          </b-btn>

          <b-button
            type="button"
            @click="createPlan()"
            variant="success"
            class="float-right mr-3"
            >Crear plan</b-button
          >
        </div>
      </b-modal>
    </b-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activesOption: [
        { text: "Activo", value: true },
        { text: "Inactivo", value: false },
      ],

      dataPlan: {
        name: "",
        active: true,
        price: 0,
        max_rooms: 0,
        max_users: 0,
        max_participants: 0,
        max_scenes: 0,
        max_gsc: 0,
        max_polls: 0,
        max_multimedia: 0,
        promo: 0,
        expired_at: "",
      },
    };
  },
  methods: {
    //the next function is for create a plan
    async createPlan() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.$axios
            .post("/api/plan", this.dataPlan)
            .then(() => {
              this.$swal.fire(
                "Creación exitosa",
                "Plan creado de manera correcta en el sistema",
                "success"
              );
              this.resetForm();
              this.$bvModal.hide("plans-create-plan");
              this.$parent.callPlans();
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
      this.dataPlan = {
        name: "",
        active: true,
        price: 0,
        max_rooms: 0,
        max_users: 0,
        max_participants: 0,
        max_scenes: 0,
        max_gsc: 0,
        max_polls: 0,
        max_multimedia: 0,
        promo: 0,
        expired_at: "",
      };
    },
  },
  mounted() {},
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

#plans-create-plan {
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