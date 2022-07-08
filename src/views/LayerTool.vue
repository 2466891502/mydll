<template>
  <div>
    <div class="layer_tool_content">
      <div class="title">
        图层
        <a-icon
          slot="extra"
          type="plus"
          style="position: absolute; right: 20px"
          @click="if_show_add_layer = true"
        />
      </div>
      <a-modal
        :title="null"
        :visible="if_show_add_layer"
        @cancel="if_show_add_layer = false"
        @ok="addNewLayer()"
        :closable="false"
        :width="300"
      >
        <div
          style="
            font-size: 15px;
            color: rgb(20, 20, 20);
            margin-top: 30px;
            margin-bottom: 10px;
          "
        >
          新建图层名称：
        </div>
        <a-input placeholder="Basic usage" v-model="temp_layer_name" />
      </a-modal>
      <div class="title_split"></div>

      <a-collapse :bordered="false">
        <a-collapse-panel key="1" header="底图">
          <a-icon
            slot="extra"
            :type="eye_data_show.basemap == true ? 'eye' : 'eye-invisible'"
            @click="eyeClick($event, 'basemap')"
          />
          <a-icon
            slot="extra"
            type="plus"
            @click="addBasemapClick($event, 'basemap')"
          />
          <!--具体底图小组件 -->
          <div
            class="data_list"
            v-for="(item, index) in layer_data_info.basemap"
            :key="index"
          >
            {{ item.name }}
            <div class="small_tool">
              <a-icon
                slot="extra"
                :type="item.show ? 'eye' : 'eye-invisible'"
                @click="showBasemap(index)"
              />
              <a-icon
                slot="extra"
                type="info-circle"
                @click="layer_data_info.basemap[index].show_info = true"
              />
              <a-icon
                slot="extra"
                type="delete"
                @click="removeBasemap(index)"
              />
            </div>
          </div>
        </a-collapse-panel>
        <a-collapse-panel
          v-for="(item, index) in layer_info"
          :key="index + 2"
          :header="item.name"
        >
          <a-icon
            slot="extra"
            :type="item.show == true ? 'eye' : 'eye-invisible'"
            @click="eyeClick($event, 'layer', item.name)"
          />
          <a-icon
            slot="extra"
            type="plus"
            @click="add3dtilesInLayer(item.name)"
          />
          <a-collapse>
            <a-collapse-panel key="400" header="建筑物1">
              <a-icon
                slot="extra"
                :type="item.show ? 'eye' : 'eye-invisible'"
                @click="showBasemap(0)"
              />
              <a-icon slot="extra" type="table" />
              <a-icon
                slot="extra"
                type="info-circle"
                @click="layer_data_info.basemap[0].show_info = true"
              />
              <a-icon slot="extra" type="delete" @click="removeBasemap(0)" />
              <p>{{ text }}</p>
            </a-collapse-panel>
          </a-collapse>
        </a-collapse-panel>
      </a-collapse>
    </div>

    <Basemap
      :add_data_show="add_data_show"
      :layer_data_info="layer_data_info"
      v-show="add_data_show.basemap == true"
    />
    <DataClassify :tileset="test_tileset" v-if="test_tileset != undefined" />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import {
  Load3DModelIon,
  Load3DModelFile,
} from "../../assets/js/CesiumTool/ModelTool.js";
import Basemap from "./LayerTool/Basemap.vue";
import DataClassify from "./LayerTool/DataClassify.vue";
function defaultValue(a, b) {
  if (a !== undefined && a !== null) {
    return a;
  }
  return b;
}
function Color(red, green, blue, alpha) {
  /**
   * The red component.
   * @type {Number}
   * @default 1.0
   */
  this.red = defaultValue(red, 1.0);
  /**
   * The green component.
   * @type {Number}
   * @default 1.0
   */
  this.green = defaultValue(green, 1.0);
  /**
   * The blue component.
   * @type {Number}
   * @default 1.0
   */
  this.blue = defaultValue(blue, 1.0);
  /**
   * The alpha component.
   * @type {Number}
   * @default 1.0
   */
  this.alpha = defaultValue(alpha, 1.0);
}

export default {
  name: "MapContainer",

  data() {
    return {
      text: "测试",
      if_show_add_layer: false,
      temp_layer_name: "默认图层",
      eye_data_show: {
        basemap: true,
      },
      add_data_show: {
        basemap: false,
      },
      test_step: 0,

      test_tileset: undefined,
    };
  },

  components: {
    Basemap,
    DataClassify,
  },
  computed: {
    ...mapState(["base_url"]),
    ...mapState(["layer_info"]),
    ...mapState(["layer_data_info"]),
  },
  methods: {
    addNewLayer() {
      this.layer_info.push({ name: this.temp_layer_name, show: true });
      this.temp_layer_name = "默认图层";
      this.if_show_add_layer = false;
    },
    addBasemapClick(e, type) {
      e.preventDefault();
      e.stopPropagation();
      this.add_data_show[type] = true;
      return false;
    },
    showBasemap(index) {
      let imageryProvider = global.viewer.imageryLayers.get(index);
      imageryProvider.show = !imageryProvider.show;
      this.layer_data_info.basemap[index].show =
        !this.layer_data_info.basemap[index].show;
    },
    removeBasemap(index) {
      let imageryProvider = global.viewer.imageryLayers.get(index);
      global.viewer.imageryLayers.remove(imageryProvider, true);
      this.layer_data_info.basemap.splice(index, 1);
    },
    eyeClick(e, type, layer_name) {
      e.preventDefault();
      e.stopPropagation();
      if (type == "layer") {
        this.layer_info[layer_name].show = !this.layer_info[layer_name].show;
      } else if (type == "basemap") {
        this.eye_data_show[type] = !this.eye_data_show[type];
      }

      return false;
    },
    add3dtilesInLayer(layer_name) {
      console.log(this.$store.state.a);
      this.$store.state.a += 1;
      let file_path =
        this.base_url + "/3dpl/apis/media/default/building_3F.json";
      let opt = {
        longitude: 118.922605,
        latitude: 32.121149,
        height: 10,
        rx: 0,
        ry: 0,
        rz: 0,
        scale: 1,
      };
      opt.longitude = opt.longitude - this.test_step * 0.0008;
      this.test_step += 1;
      Load3DModelFile(
        global.viewer,
        file_path,
        function (model_info) {
          if (model_info[0] == "callback") {
            /*that.at = model_info[1]*/
          }
        },
        opt
      );
      if (!this.layer_data_info[layer_name]) {
        this.layer_data_info[layer_name] = [];
      }
      this.layer_data_info[layer_name].push({ name: "建筑物1", show: "true" });
    },
  },

  mounted() {
    //console.log(global)
    let opt = {
      longitude: 118.922605,
      latitude: 32.121149,
      height: 1000,
      rx: 0,
      ry: 0,
      rz: -80,
      scale: 1,
    };
    //let file_path = "./wgs84/tileset.json";
    //console.log(CesiumZondy)
    //let file_path = this.base_url + "/3dpl/apis/media/default/wgs84/tileset.json";
    /*
    
    let a = CesiumZondy.M3D.appendM3D(viewer, file_path, 'file', { show: true });
    console.log(a)
    */
    /*
    Load3DModelIon(global.viewer, "530947", function (model_info) {
      if (model_info[0] == "callback") {
        console.log(model_info[1]);
      }
    });
    */
    /*
   global.viewer.scene.primitives.add(new Cesium.ClassificationPrimitive({
       
    classificationType : Cesium.ClassificationType.CESIUM_3D_TILE

}));*/
    /*
    let that = this;
    global.viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);
    var inspectorViewModel = viewer.cesium3DTilesInspector.viewModel;
    console.log(inspectorViewModel)
    Load3DModelFile(global.viewer, file_path, function (model_info) {
      if (model_info[0] == "callback") {
        console.log(model_info)
        that.test_tileset = model_info[1];
        let tileset = model_info[1];
      }
    });
    */
   //var highlightColor = new Color(0.0, 1.0, 0.0, 1);
    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function onLeftClick(movement) {
      const pickedFeature = viewer.scene.pick(movement.position);
      if (Cesium.defined(pickedFeature)) {
          
          //console.log(pickedFeature.content.tile)
          pickedFeature.color = Cesium.Color.RED
          //pickedFeature._color = highlightColor
          console.log(pickedFeature);
          global.viewer.scene.requestRender();

        
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
              //pickedFeature.primitive.show =false
        /*
        console.log(pickedFeature);
        console.log(pickedFeature.content._pointCloud);
        pickedFeature.content._pointCloud._pointSize = 5
        pickedFeature.content._pointCloud._hasColors = false
        pickedFeature.content._pointCloud._constantColor = Cesium.Color.YELLOW;
        pickedFeature.content._pointCloud._highlightColor = Cesium.Color.YELLOW;
        let s = pickedFeature.content._pointCloud._styleableShaderAttributes.x.toString()
        console.log(s)

        console.log(pickedFeature.content._pointCloud._styleableShaderAttributes)
        */
  },
};
</script>

<style lang="scss" scoped>
.layer_tool_content {
  position: fixed;
  width: 408px;
  height: 826px;
  top: 9%;
  right: 50px;
  background-color: rgba(51, 51, 51, 0.6);
  padding: 15px 5px 5px 15px;
  border-radius: 5px;

  border-width: 0px;
  font-family: "微软雅黑";
  font-weight: 400;
  font-style: normal;
  font-size: 23px;
  color: rgba(255, 255, 255, 0.996078431372549);
  user-select: none;
}
.title_split {
  margin: 5px 0px 5px 0px;
  height: 2px;
  border-top: solid #ddd;
  border-width: thin;
  text-align: center;
}
.data_list {
  font-size: 21px;
  padding: 0px 0px 0px 10%;
}
.small_tool {
  float: right;
}
</style>