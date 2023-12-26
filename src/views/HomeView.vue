<template>
  <div class="coins">
    <div class="coins-options">
      <Dropdown
        v-model="selectedCoin"
        :options="allCoins"
        optionLabel="name"
        placeholder="Select a Coin"
        @change="($event) => addOrRemoveCoin($event.value, 'all')" />
      <Dropdown
        v-model="selectedUserCoin"
        :options="userCoins"
        optionLabel="name"
        placeholder="Select a Coin"
        @change="($event) => addOrRemoveCoin($event.value, 'my')" />
    </div>
    <div class="coins-btns">
      <Button
        label="Start parsing"
        @click="startStopParsing('start')"
        :disabled="!userCoins.length" />
      <Button label="Stop parsing" @click="startStopParsing('stop')" />
    </div>
    <Toast />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { Coin } from "@/types/types";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Toast from "primevue/toast";
import axios from "axios";

const allCoins: Coin[] = reactive([]);
const userCoins: Coin[] = reactive([]);
const selectedCoin = ref<string>("");
const selectedUserCoin = ref<string>("");

const toast = useToast();

const test = [{ name: "usdt", code: "usdt" }];

const getAllCoins = async (): Promise<void> => {
  try {
    const { data } = await axios.get(
      process.env.VUE_APP_API_ROUTE + "coins/all",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.error) {
      console.log(data.error);
      return;
    }

    allCoins.push(...data.symbols);
  } catch (error) {
    console.log("error");
    toast.add({
      severity: "error",
      detail: "Something is wrone, try later",
      life: 3000,
    });
  }
};
const getUserCoins = async (): Promise<void> => {
  try {
    const { data } = await axios.get(
      process.env.VUE_APP_API_ROUTE + "coins/my",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.error) {
      console.log(data.error);
      return;
    }

    userCoins.push(...data.symbols);
  } catch (error) {
    console.log("error");
    toast.add({
      severity: "error",
      detail: "Something is wrone, try later",
      life: 3000,
    });
  }
};

const addOrRemoveCoin = async (
  objCoin: Coin,
  condition: string
): Promise<void> => {
  try {
    const { name } = objCoin;
    const { data } = await axios.put(
      process.env.VUE_APP_API_ROUTE + "coins/edit",
      { symbol: name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.error) {
      toast.add({
        severity: "error",
        detail: data.error.message,
        life: 3000,
      });
      return;
    }
    switch (condition) {
      case "all":
        const idxAll = allCoins.findIndex((el: Coin) => el.name === name);
        allCoins.splice(idxAll, 1);
        userCoins.push(objCoin);
        selectedCoin.value = "";
        toast.add({
          severity: "success",
          detail: `Add ${objCoin.name} coin`,
          life: 3000,
        });
        break;
      case "my":
        const idxMy = userCoins.findIndex((el: Coin) => el.name === name);
        userCoins.splice(idxMy, 1);
        allCoins.unshift(objCoin);
        selectedUserCoin.value = "";
        toast.add({
          severity: "success",
          detail: `Deleted ${objCoin.name} coin`,
          life: 3000,
        });
        break;
      default:
        break;
    }
  } catch (error) {
    console.log("error");
    toast.add({
      severity: "error",
      detail: "Something is wrong, try later",
      life: 3000,
    });
  }
};

const startStopParsing = async (command: string): Promise<void> => {
  try {
    const { data } = await axios.post(
      process.env.VUE_APP_API_ROUTE + "management",
      {
        command,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.error) {
      toast.add({
        severity: "error",
        detail: data.error.message,
        life: 3000,
      });
      return;
    }

    toast.add({
      severity: "success",
      detail: "Ok",
      life: 3000,
    });
  } catch (error) {
    console.log("error");
    toast.add({
      severity: "error",
      detail: "Something is wrone, try later",
      life: 3000,
    });
  }
};

onMounted((): void => {
  // getAllCoins();
  // getUserCoins();
});
</script>

<style scoped lang="scss">
.coins {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;

  transform: translateY(100%);

  &-options {
    display: flex;
    gap: 20px;
  }

  &-btns {
    display: flex;
    gap: 20px;
  }
}
</style>
