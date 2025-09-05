import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { PackageCard } from "../../../components/card";
import {
  AppButton,
  CustomText,
  FormInput,
  NotFound,
  PhotoPicker,
} from "../../../components/reuseable";
import { ListWrapper, PopupModalWrapper } from "../../../components/wrapper";
import { CONSTANT, DEBOUNCE } from "../../../utils";

export default function Packages() {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    search: {
      padding: CONSTANT.dimension.m,
      gap: CONSTANT.dimension.m,
      backgroundColor: CONSTANT.color[theme].white,
      borderBottomWidth: 0.3,
      borderBottomColor: CONSTANT.color[theme].gray50,
    },
    page: {
      padding: CONSTANT.dimension.m,
      flex: 1,
    },
  });

  //--
  const [form, setForm] = useState({
    q: "",
    sort: "all",
  });

  //--handle packages
  const [packages, setPackages] = useState();
  const [meta, setMeta] = useState();

  const [packagesLoading, setPackagesLoading] = useState(false);
  const _fetchPackages = DEBOUNCE(async (page) => {
    setPackages();
    return new Promise((resolve) => {
      setPackagesLoading(true);
      setTimeout(() => {
        setPackages(["1", "2", "3", "4", "5", "6", "7"]);
        setMeta({ has_next_page: false, page: 1 });
        setPackagesLoading(false);
        resolve();
      }, 3000);
    });
  });

  useFocusEffect(
    useCallback(() => {
      _fetchPackages(1);
    }, [form.sort])
  );

  return (
    <>
      <TopComponent />

      <View style={styles.search}>
        {/**search */}
        <FormInput
          placeholder="Type to search"
          icon={CONSTANT.icon.search}
          mode={CONSTANT.input_mode.search}
          form={form}
          setForm={setForm}
          name={"q"}
        />

        {/**filters */}
        <FilterComponent
          sort={form["sort"]}
          setSort={(value) => {
            setForm((prev) => ({
              ...prev,
              ["sort"]: value,
            }));
          }}
        />
      </View>

      <View style={styles.page}>
        {/**packages */}
        <ListWrapper
          data={packages}
          renderItem={({ item }) => <PackageCard data={item} />}
          keyExtractor={(item, index) => item.id || index.toString()}
          refreshFunc={() => {
            _fetchPackages(1);
          }}
          canLoadMore={Boolean(meta && meta?.has_next_page)}
          loadMoreFunc={() => {
            _fetchPackages(Number(meta?.page + 1));
          }}
          isLoading={packagesLoading}
          ListEmptyComponent={
            <NotFound
              text={"No packages found"}
              loaderType="package"
              isLoading={packagesLoading}
            />
          }
          numColumns={2}
          paddingBottom={CONSTANT.dimension.xxb * 4}
        />
      </View>

      {/**create package */}
      <NewPackageComponent refreshFunc={() => _fetchPackages(1)} />
    </>
  );
}

const TopComponent = ({}) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      padding: CONSTANT.dimension.m,
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.xs,
      backgroundColor: CONSTANT.color[theme].white,
      borderBottomWidth: 0.3,
      borderBottomColor: CONSTANT.color[theme].gray50,
    },
    circle: {
      width: CONSTANT.dimension.xxb,
      height: CONSTANT.dimension.xxb,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: CONSTANT.dimension.round,
      overflow: "hidden",
    },
    thumbnail: {
      backgroundColor: CONSTANT.color[theme].gray50,
    },
    notification: {
      borderWidth: 0.8,
      borderColor: CONSTANT.color[theme].gray50,
    },
    detail: {
      flex: 1,
    },
  });

  return (
    <View style={styles.component}>
      {/**thumbnail */}
      <View style={[styles.circle, styles.thumbnail]}></View>

      {/**name and greeting */}
      <View style={styles.detail}>
        <CustomText type="p">Good Morning,</CustomText>
        <CustomText type="h4">Thomas Rainbow</CustomText>
      </View>

      {/**notification icon */}
      <TouchableOpacity style={[styles.circle, styles.notification]}>
        <Feather
          name={CONSTANT.icon.bell}
          size={CONSTANT.f_size.b}
          color={CONSTANT.color[theme].gray100}
        />
      </TouchableOpacity>
    </View>
  );
};

const FilterComponent = ({ sort, setSort }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      //padding: CONSTANT.dimension.m,
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.s,
      backgroundColor: CONSTANT.color[theme].white,
      borderBottomWidth: 0.3,
      borderBottomColor: CONSTANT.color[theme].gray50,
    },
    item: {
      borderRadius: CONSTANT.dimension.round,
    },
    text: {
      paddingVertical: CONSTANT.dimension.xs,
      paddingHorizontal: CONSTANT.dimension.m,
      fontWeight: CONSTANT.f_weight.semibold,
    },
    inactive: {
      backgroundColor: CONSTANT.color[theme].gray50,
    },
    active: {
      backgroundColor: CONSTANT.color[theme].primaryFaded,
    },
    inactiveText: {
      color: CONSTANT.color[theme].gray100,
    },
    activeText: {
      color: CONSTANT.color[theme].primary,
    },
  });

  const FilterItem = ({ value = "all" }) => {
    const isActive = String(sort).toLowerCase() === String(value).toLowerCase();

    return (
      <TouchableOpacity
        style={[styles.item, isActive ? styles.active : styles.inactive]}
        onPress={() => setSort(String(value).toLowerCase())}
      >
        <CustomText
          type="sp"
          style={[
            styles.text,
            isActive ? styles.activeText : styles.inactiveText,
          ]}
        >
          {value}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.component}>
      <FilterItem value="All" />
      <FilterItem value="Completed" />
    </View>
  );
};

const NewPackageComponent = ({ refreshFunc = () => {} }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    floatCont: {
      position: "absolute",
      bottom: CONSTANT.dimension.m * 6.5,
      right: 0,

      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    floatBtn: {
      width: 180,
    },
    modal: {
      gap: CONSTANT.dimension.m,
    },
  });

  //--
  const [modalVisible, setModalVisible] = useState(false);

  //--handle package creation
  const [form, setForm] = useState({
    title: "",
    is_defined: false,
    target_amount: 0,
    auto_complete: false,
    fixed_deadline: false,
    duration: "",
    deadline: new Date(),
    has_photo: false,
    photo: {},
    description: "",
  });

  return (
    <>
      <View style={styles.floatCont}>
        <View style={styles.floatBtn}>
          <AppButton
            title="New Package"
            hasIcon
            icon={
              <Feather
                name={CONSTANT.icon.plus}
                size={CONSTANT.f_size.b}
                color={CONSTANT.color.fixed.white}
              />
            }
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>

      {/**new package modal */}
      <PopupModalWrapper
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        containerStyle={styles.modal}
        showBackDrop
      >
        {/**title */}
        <FormInput
          label={"Descriptive Package Name"}
          placeholder={"Ex. My hair plan"}
          icon={CONSTANT.icon.archive}
          mode={CONSTANT.input_mode.search}
          form={form}
          setForm={setForm}
          name={"title"}
        />

        {/**set fixed amount */}
        <>
          <FormInput
            type="switch"
            label={"Set a Budget"}
            value={form.is_defined}
            onPress={() => {
              setForm((prev) => ({ ...prev, is_defined: !form.is_defined }));
            }}
          />

          {/**amount */}
          {form.is_defined && (
            <FormInput
              label={"Budget Amount (in naira)"}
              placeholder={"Ex. 1500"}
              icon={CONSTANT.icon.credit_card}
              mode={CONSTANT.input_mode.numeric}
              form={form}
              setForm={setForm}
              name={"target_amount"}
            />
          )}
        </>

        {/**set duration */}
        <DurationComponent
          value={form.duration}
          setValue={(value) => {
            setForm((prev) => ({ ...prev, duration: value }));
          }}
        />

        {/**add photo */}
        <>
          <FormInput
            type="switch"
            label={"Attach a Photo/Screenshot"}
            value={form.has_photo}
            onPress={() => {
              setForm((prev) => ({ ...prev, has_photo: !form.has_photo }));
            }}
          />

          {form.has_photo && (
            <PhotoPicker
              photo={form.photo}
              setPhoto={(photo) => {
                setForm((prev) => ({ ...prev, photo }));
              }}
            />
          )}
        </>

        {/**description */}

        {/**button */}
        <AppButton title="Create" />
      </PopupModalWrapper>
    </>
  );
};

const DurationComponent = ({ value, setValue = () => {} }) => {
  const theme = useSelector((state) => state.app.theme);
  const styles = StyleSheet.create({
    component: {
      width: "100%",
      marginBottom: CONSTANT.dimension.m,
      gap: CONSTANT.dimension.s,
    },
    label: {
      color: CONSTANT.color[theme].black,
    },
    list: {
      width: "100%",
      flexDirection: "row",
      gap: CONSTANT.dimension.s,
      flexWrap: "wrap",
    },
    item: {
      paddingVertical: CONSTANT.dimension.xs,
      paddingHorizontal: CONSTANT.dimension.s,
      flexDirection: "row",
      alignItems: "center",
      gap: CONSTANT.dimension.xs,
      borderRadius: CONSTANT.dimension.xxs,
      borderWidth: 0.8,
      borderColor: CONSTANT.color[theme].gray50,
    },
    icon: {
      width: 18,
      height: 18,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: CONSTANT.dimension.round,
      backgroundColor: CONSTANT.color[theme].gray50,
    },
  });

  const Item = ({ item = "1 month" }) => {
    const chosen = value === item;

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          styles.item,
          chosen && { borderColor: CONSTANT.color[theme].primary },
        ]}
        onPress={() => setValue(item)}
      >
        <View
          style={[
            styles.icon,
            chosen && { backgroundColor: CONSTANT.color[theme].primary },
          ]}
        >
          <Feather
            name={CONSTANT.icon.check}
            size={CONSTANT.f_size.xs}
            color={CONSTANT.color[theme].white}
          />
        </View>
        <CustomText type="p">{item}</CustomText>
      </TouchableOpacity>
    );
  };

  const items = [
    "1 month",
    "3 months",
    "6 months",
    "9 months",
    "12 months",
    "15 months",
    "18 months",
    "24 months",
  ];

  return (
    <View style={styles.component}>
      <CustomText type="h5" style={styles.label}>
        Click To Set Package Duration
      </CustomText>

      <View style={styles.list}>
        {items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </View>
    </View>
  );
};
