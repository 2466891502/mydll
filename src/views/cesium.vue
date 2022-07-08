<template>
    <div id="ces" style="width: 100%;height: 100%;">
        <div id="top-avigation">
            <!-- <div style="height: 100%;width: 100px;background-color: rgba(49, 48, 48, 0.726);float: left;"></div> -->
            <div id="toolbar">
                <div>
                    <el-popover placement="top-start" title="ZoomIn" width="70" trigger="hover">
                        <i class="el-icon-zoom-in" @click="ZoomIn" slot="reference"></i>
                    </el-popover>
                </div>
                <div>
                    <el-popover placement="top-start" title="ZoomOut" width="80" trigger="hover">
                        <i class="el-icon-zoom-out" @click="ZoomOut" slot="reference"></i>
                    </el-popover>
                </div>
                <div>
                    <el-popover placement="top-start" title="ZoomTo" width="70" trigger="hover">
                        <i class="el-icon-map-location" @click="ZoomTo" slot="reference"></i>
                    </el-popover>
                </div>
                <div>
                    <el-popover placement="top-start" title="ColorChange" width="100" trigger="hover">
                        <i class="el-icon-coin" @click="ColorGrad" slot="reference"></i>
                    </el-popover>
                </div>
                <div>
                    <el-popover placement="top-start" title="ScreenOutput" width="110" trigger="hover">
                        <i class="el-icon-picture"  @click="Screenshot" slot="reference"></i>
                        <!-- <i class="el-icon-picture"  @click="" slot="reference"></i> -->
                    </el-popover>
                </div>
                <div>
                    <el-popover placement="top-start" title="Measurement" width="110" trigger="hover">
                        <!-- <img id="fixed" src="../assets/img/尺子_o.png" alt="" @click="measure" slot="reference"> -->
                        <img id="fixed" src="../assets/img/尺子_o.png" alt="" @click="" slot="reference">
                        <!-- <i class="el-icon-picture"  @click="" slot="reference"></i> -->
                    </el-popover>
                </div>
                <div style="width: 105px;height: 31px; float: left;margin: 7px 10px;">
                    <el-form ref="form" size="small">
                        <el-form-item>
                            <el-select v-model="region">
                                <el-option label="layer1" value="0"></el-option>
                                <el-option label="layer2" value="1"></el-option>
                                <el-option label="layer3" value="2"></el-option>
                                <el-option label="layer4" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>

        <div id="show_top-avigation" @click="toolbarcontral(ShowArr[4])">
            <!-- <i class="el-icon-arrow-down" style = "color: white;font-size: 15px;" @click="off"></i> -->
        </div>

        <div id= "tc1"  v-show="PShow" v-loading="loading" v-drag>
            <div id="close2"><i class="el-icon-close" @click="close" ></i></div>
            <div><i class="el-icon-minus" @click="minBtn" style="margin-left: 550px;"></i></div>
            <div style="position: absolute;z-index: 2000;left: 10px;top: 5px;" v-show = "true">
                <span>MAX : </span>
                <input type="text" style="width: 30px;text-align: center;" v-model = "ymax">
                <span style="margin-left: 5px;">MIN : </span>
                <input type="text" style="width: 30px;text-align: center;" v-model = "ymin">
                <button @click = "refresheacharts">Refresh</button>
            </div>
            <div ref="chart1">
                <div id= "tc1-1" ref="chart" ></div>
                <div id= "tc1-3" style="position: absolute;left: 320px;top: 60px;width: 300px;height:30px;">
                <div class="tuli_text" v-show = "ShowArr[0]">
                    <div class="tuli_point" style="background-color:#ff0000;"></div>
                    <span>Point1</span>
                </div>
                <div class="tuli_text" style="top: 25px;" v-show = "ShowArr[1]">
                    <div class="tuli_point" style="background-color:#00ff00;"></div>
                    <span>Point2</span>
                </div>
                <div class="tuli_text" style="top: 50px;" v-show = "ShowArr[2]">
                    <div class="tuli_point" style="background-color:#0000ff;"></div>
                    <span>Point3</span>
                </div>
                </div>
                <div style="position:absolute;left:-85px;top: 200px;width:200px;height:20px;transform: rotate(-90deg);">
                    <span>Displacement [mm]</span>
                </div>
            </div>
            
            <div id="tc1-2">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="Point"></el-checkbox>
                    <el-checkbox label="Line"></el-checkbox>
                    <el-checkbox label="Point1"></el-checkbox>
                    <el-checkbox label="Point2"></el-checkbox>
                    <el-checkbox label="Point3"></el-checkbox>
                </el-checkbox-group>
            </div>
            
            <div id="tc1-4">
                <i class="el-icon-folder" @click="pointdata_output" style="cursor:pointer"></i>
                <i class="el-icon-scissors" @click="pointpicture_output" style="cursor:pointer"></i>
            </div>
            
        </div>

        <div id="Screen_shot" ref="pdfop">

            <div id= "tc2"  v-if="CCShow">
                <div >
                    <div style="width: 200px;float: left;font-size: 20px;color: white;margin: 5px 5px;"><span>Layer Management:</span></div>
                    <div id="close1">
                        <i class="el-icon-close" @click="close1" style="color: white;"></i>
                    </div>
                </div>
                <div style="width: 100%;height: 1px;background-color: #0fcdfc;float: left;"></div>

                <div id="tc2-1">
                    <div class="btstyle"><span style="top: 5px;position: relative;">Shape</span></div>
                    <div id="circle"></div>
                    <div id="square"></div>
                    <div class="btstyle" style="margin-left: 30px;"><span style="top: 5px;position: relative;">Size</span></div>
                    <input type="text" style="width: 100px;height: 31px;margin-left: 5px; text-align: center;" placeholder="Advice“1~10”" v-model = "Layer_default_style[0]">
                    <div class="btstyle" style="position: absolute;margin-top: 20px;"><span style="top: 5px;position: relative;">Show</span></div>
                    <div class="block" style="margin-top: 20px;margin-left: 100px;">
                        <el-slider v-model="Layer_default_style[1]" show-input input-size = 'mini'></el-slider>
                    </div>
                    <div class="btstyle" style="position: absolute;margin-top: 20px;" >
                        <span style="top: 5px;position: relative;">Color</span>
                    </div>

                    <div style="float: left;margin-top:23px;margin-left: 87px;">
                        <div style="background-color: white;width: 300px;height: 30px;">
                            <div id="colorbelt" ><img id="heading" :src="changecolorbelt" style="max-height: 100%;max-width: 100%;height: 20px;width: 310px;"></div>
                            <el-form ref="form" size="mini"  style="float: right;position: absolute;left: 110px;" >
                                <el-form-item >
                                    <el-select v-model="Layer_default_style[0]">
                                        <el-option v-model="Layer_default_style[0]"><div class="sedai" id="sd1" @click = colorchange(1) ></div></el-option>
                                        <el-option v-model="Layer_default_style[0]"><div class="sedai" id="sd2" @click = colorchange(2) ></div></el-option>
                                        <el-option v-model="Layer_default_style[0]"><div class="sedai" id="sd3" @click = colorchange(3) ></div></el-option>
                                        <el-option v-model="Layer_default_style[0]"><div class="sedai" id="sd4" @click = colorchange(4) ></div></el-option>
                                        <el-option v-model="Layer_default_style[0]"><div class="sedai" id="sd5" @click = colorchange(5) ></div></el-option>
                                        <el-option v-model="Layer_default_style[0]"><div class="sedai" id="sd6" @click = colorchange(6) ></div></el-option>
                                        <el-option v-model="Layer_default_style[0]"><div class="sedai" id="sd7" @click = colorchange(7) ></div></el-option>
                                        <el-option v-model="Layer_default_style[0]"><div class="sedai" id="sd8" @click = colorchange(8) ></div></el-option>
                                        <el-option v-model="Layer_default_style[0]"><div class="sedai" id="sd9" @click = colorchange(9) ></div></el-option>
                                        <el-option v-model="Layer_default_style[0]"><div class="sedai" id="sd10" @click = colorchange(10) ></div></el-option>
                                        <!-- <el-option><div class="sedai" id="sd3" @click = colorchange(3)></div></el-option>
                                        <el-option><div class="sedai" id="sd4" @click = colorchange(4)></div></el-option> -->
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    
                    <div><button style="margin-left:200px;margin-top: 40px; font-size: 20px;" @click="apply">Apply</button></div>
                    
                    <div style="width: 100px;height: 30px;position: absolute;left: 75px;top: 190px;">
                        <span style="position: relative;color: #ffffff;font-size: 10px;">MIN</span>
                        <input type="text" style="width: 50px;height: 25px;margin-top: 5px;margin-left: 5px; text-align: center;" v-model = "Color_Range[6]">
                    </div>
                    <div style="width: 100px;height: 30px;position: absolute;left: 326px;top: 190px;">
                        <span style="position: relative;color: #ffffff;font-size: 10px;">MAX</span>
                        <input type="text" style="width: 50px;height: 25px;margin-top: 5px;margin-left: 5px; text-align: center;" v-model = "Color_Range[0]">
                    </div>
                    <!-- <div id="tc2-2" v-show="colorbelt_show">
                        <div style="width: 100px;float: left;font-size: 20px;color: white;margin: 5px 5px;"><span>Color:</span></div>
                        <div style="width: 100%;height: 1px;background-color: #0fcdfc;float: left;"></div>
                        <div style="margin: 5px 7px;">
                            <div class="btstyle" style="margin-left: 10px;margin-top: 5px;"><span style="top: 5px;position: relative;">MAX</span></div>
                            <input type="text" style="width: 100px;height: 31px;margin-top: 5px;margin-left: 15px; text-align: center;"placeholder="“-13.73~5.52”" v-model = "Color_Range[0]">
                        </div>
                        <div style="margin: 5px 7px;">
                            <div class="btstyle" style="margin-left: 10px;margin-top: 5px;"><span style="top: 5px;position: relative;">MIN</span></div>
                            <input type="text" style="width: 100px;height: 31px;margin-top: 5px;margin-left: 15px; text-align: center;"placeholder="“-13.73~5.52”" v-model = "Color_Range[1]">
                        </div>
                    </div>  -->   
                </div>

            </div>

            <div id = "tc4">
                <div style="width: 80%;height: 86%;margin: 10% 10% 0 10%;;text-align: center">
                    <div style="width: 40%;height: 100%;float: left;"><img :src= "imgurl" style="width: 100%;height: 100%;"></div>
                    <div style="width: 40%;height: 100%;float: left;margin: -11% 7% 10% 7%;">
                        <div v-for="(item,index) in Color_Range" style="float: left;margin-top:17px;"><span>{{Color_Range[index]}}</span></div>
                        <!-- <div style="float: left;"></div>
                        <div ><span>{{Color_Range[1]}}</span></div> -->
                    </div>
                </div>
                <div style="width: 100%;text-align: center;float: left;position: absolute;"><span>mm/year</span></div>
            </div>

            <div id = "tc5" @click="maxBtn" style="text-align: center;cursor:pointer;" v-show="SShow">
                <span>Scatter</span>
            </div>

            <div id="tc8" >
                <div class="tc8-1" v-show="showpointdata1">
                    <!-- <div style="left: 93%;width: 15px;height: 15px;color: #ffffff;position: absolute;top: 0px;"> -->
                        <i class="el-icon-close" @click="close3" style="font-size: 15px;margin-left: 200px;"></i>
                    <!-- </div> -->
                    <div class="tc8-2"><div style="margin-top: 20px;color: #ff0000;font-weight: 600;">P1</div></div>
                    <div class="tc8-3">
                        <div style="width: 180px;height:80%;margin-top: 10px;">
                            {{pointdata[0]}}
                            {{pointdata[1]+'mm/yr'}}
                        </div>
                    </div>
                </div>
                <div class="tc8-1" v-show="showpointdata2">
                    <!-- <div style="left: 93%;width: 15px;height: 15px;color: #ffffff;position: absolute;top: 72px;" > -->
                        <!-- <i class="el-icon-close" @click="close4" style="font-size: 15px;"></i> -->
                        <i class="el-icon-close" @click="close4" style="font-size: 15px;margin-left: 200px;"></i>
                    <!-- </div> -->
                    <div class="tc8-2"><div style="margin-top: 20px;color: #00ff00;font-weight: 600;">P2</div></div>
                    <div class="tc8-3">
                        <div style="width: 180px;height:80%;margin-top: 10px;">
                            {{pointdata[3]}}
                            {{pointdata[4]+'mm/yr'}}
                        </div>
                    </div>
                </div>
                <div class="tc8-1" v-show="showpointdata3">
                    <!-- <div style="left: 93%;width: 15px;height: 15px;color: #ffffff;position:relative;top: 143px;" > -->
                        <!-- <i class="el-icon-close" @click="close5" style="font-size: 15px;"></i> -->
                        <i class="el-icon-close" @click="close5" style="font-size: 15px;margin-left: 200px;"></i>
                    <!-- </div> -->
                    <div class="tc8-2"><div style="margin-top: 20px;color: #0000ff;font-weight: 600;">P3</div></div>
                    <div class="tc8-3">
                        <div style="width: 180px;height:80%;margin-top: 10px;">
                            {{pointdata[6]}}
                            {{pointdata[7]+'mm/yr'}}
                        </div>
                    </div>
                </div>
            </div>

            <div id="cesiumContainer" style="width: 100%;height: 100%;">
            </div>
        </div>

        <div id = "tc3"></div>
        
        <div v-drag id= "tc6"  v-show="TShow">
            <div id="close3"><i class="el-icon-close" @click="close2"></i></div>
            <div ref="pdfop1" id="tc6-1" style="height: 100%;width: 100%;position: absolute;">
                <div id="border-top"></div>
                <div id="border-bottom"></div>
                <div id="border-left"></div>
                <div id="border-right"></div>
                <div id="border-left-middle"></div>
                <div id="border-right-middle"></div>
                <div id="border-right-middle1"></div>
                <div id="Pointer"></div>
                <span id="lon1">{{pointlocation[3]}}°N</span>
                <span id="lon2">{{pointlocation[1]}}°N</span>
                <span id="lon3">{{pointlocation[5]}}°N</span>
                <span id="lat1">{{pointlocation[2]}}°E</span>
                <span id="lat2">{{pointlocation[10]}}°E</span>
                <span id="lat4">{{pointlocation[11]}}°E</span>
                <span id="lat3">{{pointlocation[4]}}°E</span>
                <div id="Scale">
                    <span id="Scale1">{{pointlocation[6]}}</span>
                    <span id="Scale2">{{pointlocation[7]}}</span>
                    <span id="Scale3">{{pointlocation[8]}}{{pointlocation[9]}}</span>
                    <div id="Scale-1"></div>
                </div>

                <div id="tc7">
                    <img :src="cutpicture" alt="" style="background-repeat: no-repeat;background-size: 100% 100%;width: 960px;height: 459px;">
                </div>
            </div>
            <!-- <div id="close3"><i class="el-icon-close" @click="close2"></i></div> -->
            
            <button id="download" @click = "downloadImage">Download</button>
        </div>
    </div>
    
</template>

<script>
//import vcolorpicker from 'vcolorpicker'
import echarts from 'echarts'
const d3 = require('d3-dsv')
//import CesiumNavigation from 'cesium-navigation-es6'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { dataConversionUtil } from '../utils/data2Excel'
export default {
    name:"ces",
    data(){
        return{
            viewer:null,
            SHPoints:[],
            SCPoints:[],
            TArr:[],
            PNumber:null,
            ShowArr:[false,false,false,true,true,false,false,false],
            CCShow:false,
            PShow:false,
            SShow:false,
            TShow:false,
            level:null,
            Parr:[],
            tlie:null,
            //WP:false,
            loading:false,
            colorbelt_show:false,
            Layer_default_style:[4,100],
            changecolorbelt:require('../assets/img/bcyr.png'),
            Color_Range:[5.52,2.31,-0.90,-4.11,-7.31,-10.52,-13.73],
            C_3list:[],
            region: 'layer1',
            imgurl:require('../assets/img/bcyr1.png'),
            heading:null,
            pointlocation:[],
            downloadurl:null,
            cutpicture:null,
            pointsnumber:1,
            seriesarr:[],
            seriesarr_spare:[],
            timearr:[],
            ymax:25,
            ymin:-35,
            checkList:['Point','Line','Point1','Point2','Point3'],
            activePArr:[],
            MovePoint:null,
            activePicture:null,
            activeNames: [''],
            pointdata:[],
            showpointdata1:false,
            showpointdata2:false,
            showpointdata3:false,
            measure_handler:null,
            start_readcsv:true,
            //drawingMode:'line'
            
        }
    },
    methods:{
        loadmap(){
            Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMzk1N2M2MC1iZGEzLTRiNTYtODBkYS1lZGE5MWFlMzRlYmIiLCJpZCI6NjIzMjUsImlhdCI6MTYyNjkyODk0Nn0.qkod1zcxXUOQVpI0filZVx7a-ClE_3usQC-9BXPJ8pA'
            Cesium.Camera.DEFAULT_VIEW_FACTOR=1;
            const viewer = new Cesium.Viewer('cesiumContainer', {
                selectionIndicator: false,
                infoBox: true,
                animation:false,
                timeline:false,
                homeButton: false,
                fullscreenButton: false,
                sceneModePicker: false,
                navigationHelpButton: false,
                geocoder: false,
                //scene3DOnly: true,
                baseLayerPicker:false,
                creditContainer:document.createElement("div"),
                terrainProvider: new Cesium.EllipsoidTerrainProvider({}),
                terrainProvider: Cesium.createWorldTerrain() ,
                infoBox: true,  //是否显示点击要素之后显示的信息
                CreditsDisplay: false,
                allowTextureFilterAnisotropic: true,
                "contextOptions": {
                    "webgl": {
                        "alpha": true,
                        "depth": false,
                        "stencil": true,
                        "antialias": true,
                        "premultipliedAlpha": true,
                        "preserveDrawingBuffer": true,
                        "failIfMajorPerformanceCaveat": true
                    },
                    "allowTextureFilterAnisotropic": true
                }


            });
            this.viewer = viewer;
        },
        
        readcsv(){
            if(this.start_readcsv){
            //this.viewer.scene.globe.depthTestAgainstTerrain = false;
            this.viewer.camera.setView({
                // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
                // fromDegrees()方法，将经纬度和高程转换为世界坐标
                destination:Cesium.Cartesian3.fromDegrees(114.1,22.627125,50000.0),
                orientation:{
                // 指向
                heading:Cesium.Math.toRadians(0,0),
                // 视角
                pitch:Cesium.Math.toRadians(-90),
                roll:0.0
                }
            });
            
            //var heights  = []
            // this.$axios.get('../sz_sx.csv').then(res => {undefined
            // //this.$axios.get('https://www.aicitytech.com/hkudemo/upload/sz_sx.csv').then(res => {undefined
            //     var ret = d3.csvParse(res.data)
            //     this.SHPoints = ret
            //     console.log(ret)
            
            // })
            
            
            var that = this;
            var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
            handler.setInputAction(function (evt) {
            var scene = that.viewer.scene;
            
            if (scene.mode !== Cesium.SceneMode.MORPHING) {
                that.loading = true
                var pickedObject = scene.pick(evt.position);
                if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
                    var cartesian = that.viewer.scene.pickPosition(evt.position);
                    if (Cesium.defined(cartesian)) {
                        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                        var lng = Cesium.Math.toDegrees(cartographic.longitude);
                        var lat = Cesium.Math.toDegrees(cartographic.latitude);
                        var height = cartographic.height;//模型高度
                        var mapPosition = { x: lng, y: lat, z: height };
                        //console.log(mapPosition);
                    }
                    //保留小数点后四位
                    var a = Math.floor(lng * 10000) / 10000
                    var b = Math.floor(lat * 10000) / 10000
                    
                    that.$axios.get('https://www.aicitytech.com/hkudemo/ihgu/get?x='+a+'&y='+b).then(rns => {undefined
                    //this.$axios.get('https://www.aicitytech.com/hkudemo/upload/sz_sx.csv').then(res => {undefined
                        //var rnt = d3.csvParse(rns.data)
                        that.SHPoints = rns.data.data
                    
                    //遍历数组
                    // for(var i=0;i<that.SHPoints.length;i++){
                    //     var a1 = that.SHPoints[i].x
                    //     var b1 = that.SHPoints[i].y
                    //     var a2 = Math.floor(a1 * 10000) / 10000
                    //     var b2 = Math.floor(b1 * 10000) / 10000
                    //     if((a2-0.0002) < a && a < (a2+0.0002)){

                    //         if((b2-0.0002) < b && b < (b2+0.0002)){
                    //             var PointArr
                    //             that.Parr = that.SHPoints[i]
                    //             if(that.WP){
                    //                 that.remove()
                    //             }
                    //             PointArr = Cesium.Cartesian3.fromDegrees(lng,lat),
                    //             that.createPoint(PointArr)
                    //             PointArr = null
                    //         }     
                    //     }
                    // }  

                    // let m = that.Parr
                    // console.log(m)
                    // let n = []
                    // for(let key in m){
                    //     n.push(m[key])
                    // }
                    // console.log(n)
                    let n = []
                    n = that.SHPoints
                    if(n){

                        var time = ['20170312','20170324','20170405','20170417','20170429','20170511','20170523','20170604','20170628','20170710','20170722','20170803','20170827','20170908','20170920','20171002'
                        ,'20171014','20171026','20171107','20171119','20171201','20171213','20171225','20180106','20180130','20180211','20180223','20180307','20180319','20180331','20180412','20180424','20180506'
                        ,'20180518','20180611','20180623','20180705','20180729','20180810','20180903','20180915','20180927','20181009','20181021','20181102','20181114','20181126','20181208','20181220','20190101'
                        ,'20190113','20190125','20190206','20190218','20190302','20190314','20190326','20190407','20190501','20190513','20190606','20190618','20190630','20190805','20190817','20190829','20190910'
                        ,'20190922','20191004','20191016','20191028','20191109','20191121','20191203','20191215','20191227','20200108','20200120','20200201','20200213','20200225','20200308','20200320','20200401'
                        ,'20200413','20200425','20200531','20200612','20200718','20200730','20200811','20200823','20200904','20200916','20200928','20201010','20201022','20201103','20201115','20201127','20201209'
                        ,'20201221','20210102','20210114','20210126','20210207','20210219','20210303']
                        that.timearr = time
                        var scatterdata = []
                        //var pointdata = []
                        for(var i=1;i<113;i++){
                            scatterdata.push([time[i-1],n[i+3]]) 
                        }
                        var lng1 = lng.toFixed(4)
                        var lat1 = lat.toFixed(4)
                        var cmyr = parseFloat(n[2]).toFixed(2)
                        var sjheight = parseFloat(n[3]).toFixed(2)
                        var scatter_colorarr = ['red','green','blue']
                        switch (that.pointsnumber){
                            case 1:
                                //that.pointdata.push([lng1,lat1,sjheight,cmyr])
                                that.pointdata.push(lng1+','+lat1,sjheight+','+cmyr,sjheight)
                                that.createPoint(lng,lat,that.pointsnumber)
                                // that.seriesarr.push(
                                //     {num:that.pointsnumber,type: 'scatter',data:c,itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                //     {num:that.pointsnumber,type: 'line',data:c,symbol: "none",itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                // )
                                that.seriesarr_spare.push(
                                    {type: 'scatter',data:scatterdata,itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                    {type: 'line',data:scatterdata,symbol: "none",itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                )
                                that.checkList = []
                                that.checkList.push('Point','Line','Point1')
                                that.ShowArr[0] = true
                                that.pointsnumber++
                                break;
                            case 2:
                                that.pointdata.push(lng1+','+lat1,sjheight+','+cmyr,sjheight)
                                that.createPoint(lng,lat,that.pointsnumber)
                                // that.seriesarr.push(
                                //     {num:that.pointsnumber,type: 'scatter',data:c,itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                //     {num:that.pointsnumber,type: 'line',data:c,symbol: "none",itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                // )
                                that.seriesarr_spare.push(
                                    {type: 'scatter',data:scatterdata,itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                    {type: 'line',data:scatterdata,symbol: "none",itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                )
                                that.checkList.push('Point2')
                                that.ShowArr[1] = true
                                that.pointsnumber++
                                break;
                            case 3:
                                that.pointdata.push(lng1+','+lat1,sjheight+','+cmyr,sjheight)   
                                that.createPoint(lng,lat,that.pointsnumber)
                                // that.seriesarr.push(
                                //     {num:that.pointsnumber,type: 'scatter',data:c,itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                //     {num:that.pointsnumber,type: 'line',data:c,symbol: "none",itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                // )
                                that.seriesarr_spare.push(
                                    {type: 'scatter',data:scatterdata,itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                    {type: 'line',data:scatterdata,symbol: "none",itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                )
                                that.checkList.push('Point3')
                                that.ShowArr[2] = true
                                that.pointsnumber++
                                break;
                            case 4:
                                that.remove()
                                that.pointsnumber = 1
                                that.createPoint(lng,lat,that.pointsnumber)
                                // that.seriesarr = [
                                //     {num:that.pointsnumber,type: 'scatter',data:c,itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                //     {num:that.pointsnumber,type: 'line',data:c,symbol: "none",itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                // ]
                                that.pointdata = []
                                that.pointdata.push(lng1+','+lat1,sjheight+','+cmyr,sjheight)
                                that.seriesarr_spare = [
                                    {type: 'scatter',data:scatterdata,itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                    {type: 'line',data:scatterdata,symbol: "none",itemStyle:{color:scatter_colorarr[that.pointsnumber-1]}},
                                ]
                                that.checkList = ['Point','Line','Point1']
                                that.ShowArr[1] = false
                                that.ShowArr[2] = false
                                that.pointsnumber++
                                break;
                            default :
                                console.log("-1")  // 如果没有与表达式相同的值，则执行该代码
                        }
                        //创建新的覆盖点
                        that.showpointdata()
                        that.loading = false;
                        scatterdata = []
                        n = [] 
                        that.PShow = true;
                    }else{
                        that.open()
                        //alert("The point is not selected, please select again")
                        that.loading = false;
                    }
                    })
                }else{
                    that.open()
                    //alert("The point is not selected, please select again")
                    that.loading = false;
                }
            }
            //that.PShow = true;
            that.SShow = false;
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            //右键
            handler.setInputAction(function () {
                handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
                handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            }
        },
        
        //显示隐藏点信息
        showpointdata(){
            var length = this.pointdata.length
            if(length == 3){
                this.showpointdata1 = true
                this.showpointdata2 = false
                this.showpointdata3 = false
            }
            if(length == 6){
                this.showpointdata2 = true
                this.showpointdata1 = true
                this.showpointdata3 = false
            }
            if(length == 9){
                this.showpointdata3 = true
                this.showpointdata2 = true
                this.showpointdata1 = true
            }
            
        },

        open() {
            this.$message({
            message: 'The point is not selected, please select again',
            type: 'warning'
            });
        },

        mouselocation(){
            var that = this
            var a 
            var canvas = that.viewer.scene.canvas; 
            var handler = new Cesium.ScreenSpaceEventHandler(that.viewer.scene.canvas);
            handler.setInputAction(function (movement) { 
                var cartesian = that.viewer.scene.camera.pickEllipsoid(movement.endPosition, ellipsoid); 
                var ellipsoid = that.viewer.scene.globe.ellipsoid; 
                
                if (cartesian) { //能获取，显示坐标
                    var cartographic = ellipsoid.cartesianToCartographic(cartesian);
                    var longitude = Cesium.Math.toDegrees(cartographic.longitude)
                    var latitude = Cesium.Math.toDegrees(cartographic.latitude)

                    var terrainProvider = Cesium.createWorldTerrain();   
                    var position = [Cesium.Cartographic.fromDegrees(longitude,latitude)]
                    var promise = Cesium.sampleTerrainMostDetailed(terrainProvider, position);
                    
                    Cesium.when(promise, function (updatedPositions) {
                    
                        var terrainHeight = updatedPositions[0].height
                        a = terrainHeight
                        //console.log(terrainHeight);

                    })
                    var coords = 'Longitude:' +parseFloat(longitude).toFixed(4)
                    + ', Latitude:' + parseFloat(latitude).toFixed(4)
                    + ', View_height:' + Math.ceil(that.viewer.camera.positionCartographic.height)
                    + ', Point_height:' + parseFloat(a).toFixed(4)
                    document.getElementById('tc3').innerHTML = coords;
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        },
    
        //散点图生成
        eachartsInit(axisData) {
            console.log(axisData)
            var bardv = this.$refs.chart;
            if(bardv){
                let myCharts = this.$echarts.init(bardv)
                var option = {
                    xAxis: {
                        type: 'category', 
                        name:'Date',
                        position:'bottom',
                        nameLocation:"end", 
                        axisLine:{                 //坐标 轴线
                            show:true,             //是否显示坐标轴轴线
                            onZero:false,           //X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效
                        },
                        axisLabel:{
                            rotate:-45,
                        },
                        boundaryGap: [0.2,0.2],
                    },
                    yAxis: {
                        type: 'value',
                        scale: true,
                        //boundaryGap: false,
                        max: this.ymax,
                        min: this.ymin,
                        boundaryGap: [0.2, 0.2]
                    },
                    grid: {
                        left: '5%',
                        right: '8%',
                        bottom: '8%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger:'item',
                        formatter:(params) => {  // params就是数据
                            return `Date:${params.data[0]}</br>Observations:${params.data[1]}`
                        }
                    },
                    dataZoom: [//加上dataZoom可实现缩放
                        {
                            type: 'inside',//x轴
                            xAxisIndex: 0,
                            zoomOnMouseWheel:true,//如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。
                        },
                        {
                            type: 'slider',//x轴
                            xAxisIndex: 0,
                            //bottom: '10px'
                        },
                    ],
                    series: axisData
                };
                // 使用刚指定的配置项和数据显示图表。
                myCharts.setOption(option,true);
            }
        }, 

        createPoint(lng,lat,num) {
            var PointArr = Cesium.Cartesian3.fromDegrees(lng,lat)
            var color = Cesium.Color.fromRandom({alpha: 0 });
            var colorarr = [Cesium.Color.RED,Cesium.Color.GREEN,Cesium.Color.BLUE]
            var point = this.viewer.entities.add({
                position: PointArr,
                id:num,
                point: {
                    color: color,
                    pixelSize: 8,
                    outlineColor: colorarr[num-1],
                    outlineWidth: 5,
                    eyeOffset: new Cesium.Cartesian3(0, 0, 999),
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    disableDepthTestDistance:50000
                },
                /* label : {
                    disableDepthTestDistance:50000,
                    text : ''+lng1+'  '+lat1+'  '+sjheight+'  '+cmyr+'',
                    font : '14pt Source Han Sans CN',    //字体样式
                    fillColor:Cesium.Color.BLACK,        //字体颜色
                    backgroundColor:Cesium.Color.YELLOW,    //背景颜色
                    showBackground:true,                //是否显示背景颜色
                    style: Cesium.LabelStyle.FILL,        //label样式
                    outlineWidth : 2,                    
                    verticalOrigin : Cesium.VerticalOrigin.CENTER,//垂直位置
                    horizontalOrigin :Cesium.HorizontalOrigin.LEFT,//水平位置
                    pixelOffset:new Cesium.Cartesian2(10,0),         //偏移
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                } */
            });
            //this.WP = true
            return point;
        },

        remove(){
            this.viewer.entities.removeAll();
        },

        close(){
            this.PShow = !this.PShow
            this.remove()
            this.pointsnumber = 1
            this.seriesarr = []
        },

        close1(){
            this.CCShow = false
        },

        close2(){
            this.TShow = !this.TShow
            this.cutpicture = null
            this.pointlocation = []
        },

        close3(){
            this.showpointdata1 = false
            console.log("0")
        },
        
        close4(){
            this.showpointdata2 = false
        },
        
        close5(){
            this.showpointdata3 = false
        },

        ZoomTo(){
            this.viewer.zoomTo(this.tlie);
        },

        ZoomIn(){
            this.viewer.camera.zoomIn(2000);
        },

        ZoomOut(){
            this.viewer.camera.zoomOut(2000);
        },

        ColorGrad(){
            this.C_3list = ['#0000FF','#4169E1','#40E0D0','#7FFFD4','#F0E68C','#FFDEAD','#FFA500','#FF8C00','#FF0000']
            this.CCShow = !this.CCShow
            this.colorbelt_show = false
        },

        apply(){
            var max = this.Color_Range[0]
            var min = this.Color_Range[6]
            var step = (max - min)/9
            var step1 = (max - min)/6
            var BreakpointsArr = []
            //var BreakpointsArr1 = []
            for(var i = 1; i < 10;i++){
                var n = max - step*i
                BreakpointsArr.push(n)
            }
            this.Color_Range = []
            for(var i = 0; i < 7;i++){
                var m = (max - step1*i).toFixed(2)
                this.Color_Range.push(m)
            }
            var colorArr1 = []
            var Transparency = this.Layer_default_style[1] / 100
            for(var j=0;j<9;j++){
                let e = ["${cmyr} >= "+BreakpointsArr[j],"color(\'"+this.C_3list[j]+"\',"+Transparency+")"]
                colorArr1.push(e)
            }
            var style = {
                color: {
                    conditions: colorArr1
                },
                pointSize: {
                    conditions: [
                        ["true",this.Layer_default_style[0]]
                    ]
                }
            }
            this.tlie.style = new Cesium.Cesium3DTileStyle(style); 
        },

        addlayer(value){
            this.viewer.scene.globe.depthTestAgainstTerrain = true;
            var a
            if(value == 1){
                //a = '../PointCloudsz/tileset.json'
                a = 'https://www.aicitytech.com/hkudemo/upload/PointCloudsz_sj/tileset.json'
            }else if(value == 2){
                //a = '../PointCloudmm/tileset.json'
                a = ''
            }else if(value == 3){
                //a = '../PointCloudxld/tileset.json'
                a = ''
            }else{
                //a = '../PointCloudmm/tileset.json'
                a = 'https://www.aicitytech.com/hkudemo/upload/PointCloudsz/tileset.json'
            }
            var tileset = this.viewer.scene.primitives.add(
                new Cesium.Cesium3DTileset({
                    url: a,
                    //url:"https://www.aicitytech.com/hkudemo/upload/PointCloudsz/tileset.json",
                    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                })
            );
            // 加载地形
            /* viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
                url: Terrain, // 地址记得换成自己的地形数据地址
                requestWaterMask: true, // 开启法向量
                requestVertexNormals: true // 开启水面特效
            }) */

            /* tileset.readyPromise.then(function () {
                viewer.zoomTo(tileset);
            }); */

            tileset.style = new Cesium.Cesium3DTileStyle({
            color: {
                conditions:  /* this.color_condition */  
                
                /*[
                ['${cmyr} > 34', "color('#ff0000')"],
                ['${cmyr} > 20', "color('#ff6600')"],
                ['${cmyr} > 5', "color('#ff9900')"],
                ['${cmyr} > -9', "color('#ffcc00')"], 
                ['${cmyr} > -24', "color('#ffff00')"], 
                ]*/  
                
                 [
                ['${cmyr} > 4', "color('#0000FF')"],
                ['${cmyr} > 2', "color('#4169E1')"],
                ['${cmyr} > 0', "color('#40E0D0')"],
                ['${cmyr} > -2', "color('#7FFFD4')"],

                ['${cmyr} > -4', "color('#F0E68C')"],

                ['${cmyr} > -6', "color('#FFDEAD'),"], 
                ['${cmyr} > -8', "color('#FFA500')"], 
                ['${cmyr} > -10', "color('#FF8C00')"],
                ['${cmyr} > -12', "color('#FF0000')"], 
                ]  
            },
            pointSize: {
                conditions: [
                    ["true", 5]
                ]
            }
            });
            //tileset.show = false
            this.tlie = tileset
            
        },

        colorchange(value){
            //console.log(document.getElementById("heading"))
            //console.log(document.getElementById("heading").src)
            //console.log(document.getElementById("ssc").value)
            //document.getElementById("heading").src = document.getElementById("selection").value;
            switch (value){
                case 1:
                    this.C_3list = ['#0000FF','#4169E1','#40E0D0','#7FFFD4','#F0E68C','#FFDEAD','#FFA500','#FF8C00','#FF0000']
                    this.imgurl = require('../assets/img/bcyr1.png')
                    this.changecolorbelt = require('../assets/img/bcyr.png')
                    break;
                case 2:
                    this.C_3list = ['#0000FF','#006eff','#58b4ff','#9ce8fc','#cef2fc','#f8ff94','#fcdd57','#ff6752','#a52818']
                    this.imgurl = require('../assets/img/GMT_panoply1.png')
                    this.changecolorbelt = require('../assets/img/GMT_panoply.png')
                    break;
                case 3:
                    this.C_3list = ['#3b7c06','#6ec526','#b6f782','#fdefc1','#eed686','#e6a037','#db7235','#cf4b34','#8f2c1a']
                    this.imgurl = require('../assets/img/RdYlGn_111.png')
                    this.changecolorbelt = require('../assets/img/RdYlGn_11.png')
                    break;
                case 4:
                    this.C_3list = ['#65089b','#5b1ee9','#1521ce','#4dbdd1','#3ef06a','#ebf749','#f7cd44','#f78c44','#ad1f0d']
                    this.imgurl = require('../assets/img/rainbow1.png')
                    this.changecolorbelt = require('../assets/img/rainbow.png')
                    break;
                case 5:
                    this.C_3list = ['#2b19cc','#2a35cc','#3c46c9','#5377c5','#a0dacd','#c5b581','#c9a559','#da965f','#d37b34']
                    this.imgurl = require('../assets/img/temperature1.png')
                    this.changecolorbelt = require('../assets/img/temperature.png')
                    break;
                case 6:
                    this.C_3list = ['#100cf8','#302dfd','#5653fa','#a1a0ff','#ffffff','#f8baba','#fc8d8d','#fa4c4c','#fc1010']
                    this.imgurl = require('../assets/img/GMT_polar1.png')
                    this.changecolorbelt = require('../assets/img/GMT_polar.png')
                    break;
                case 7:
                    this.C_3list = ['#2f4a92','#4184b1','#49bd79','#88f3cf','#eed686','#e6a037','#db7235','#cf4b34','#8f2c1a']
                    this.imgurl = require('../assets/img/Spectral_111.png')
                    this.changecolorbelt = require('../assets/img/Spectral_11.png')
                    break;
                case 8:
                    this.C_3list = ['#05225a','#18418d','#6680b1','#a5c3fa','#ffffff','#fdd49f','#fcb14f','#ff4d2d','#9e2915']
                    this.imgurl = require('../assets/img/BlueWhiteOrangeRed1.png')
                    this.changecolorbelt = require('../assets/img/BlueWhiteOrangeRed.png')
                    break;
                case 9:
                    this.C_3list = ['#1437ff','#39ffcd','#5af746','#cef76e','#fdf905','#e9d565','#db6c2c','#e02b25','#9b1814']
                    this.imgurl = require('../assets/img/GMT_seis1.png')
                    this.changecolorbelt = require('../assets/img/GMT_seis.png')
                    break;
                case 10:
                    this.C_3list = ['#100641','#141291','#4b2972','#7347a5','#7647a1','#dbb282','#ffb13b','#f7da7e','#fdf905']
                    this.imgurl = require('../assets/img/thermal1.png')
                    this.changecolorbelt = require('../assets/img/thermal.png')
                    break;
                default :
                    console.log("-1")  // 如果没有与表达式相同的值，则执行该代码
            }
        },

        dimension(){

            if (this.viewer) {
                var scene = this.viewer.scene;
                var ellipsoid = scene.globe.ellipsoid;
                var result = this.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(this.viewer.canvas.clientWidth / 2, this.viewer.canvas
                    .clientHeight / 2));
                var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
                //屏幕中心点经纬度
                var lon1 = curPosition.longitude * 180 / Math.PI;
                var lat1 = curPosition.latitude * 180 / Math.PI;
                this.pointlocation.push(lon1.toFixed(2))
                this.pointlocation.push(lat1.toFixed(2))
                
                //相机高度
                var height = ellipsoid.cartesianToCartographic(this.viewer.camera.position).height;
                //相机经纬度
                var direction = this.viewer.camera.positionCartographic;
                var lon2 = Cesium.Math.toDegrees(direction.longitude);
                var lat2 = Cesium.Math.toDegrees(direction.latitude);
                //相机视角
                this.heading= this.viewer.camera.heading;
                //console.log(this.heading)
                //相机高度
                var z = direction.height;
                //经纬度转世界坐标
                var position1 = Cesium.Cartesian3.fromDegrees(lon1,lat1,0);
                var position2 = Cesium.Cartesian3.fromDegreesArrayHeights([lon2,lat2,z]);//coordinates格式为带有高度的数组。例如：[-115.0, 37.0, 100000.0, -107.0, 33.0, 150000.0]
                // var position3 = Cesium.Cartesian3.fromDegrees(lon2,lat2,0);
                
                var x = position1.x - position2[0].x               
                var y = position1.y - position2[0].y
                var z = position1.z - position2[0].z
                var h1 = Math.sqrt((x*x)+(y*y)+(z*z))
                //console.log(this.viewer.camera)
                var pitch = this.viewer.camera.pitch.toFixed(2)
                //视角弧度转角度
                //const degrees = heading * (180 / Math.PI);
                //var a = Math.sin(30*Math.PI/180)
                // var a = Math.sin(this.heading)
                // var b = Math.cos(this.heading)
                // var c = Math.sqrt(2)
                // var h2 = z*(Math.sqrt(3)/2)

                // //相机新的世界坐标
                // var x1 = position2[0].x + (z / 2 * b)
                // var y1 = position2[0].y + (z / 2 * a)
                // var z1 = position2[0].z - z*0.4

                // let cartesian3 = new Cesium.Cartesian3(x1,y1,z1);
                // let cartographic = ellipsoid.cartesianToCartographic(cartesian3);
                // var lat3 = Cesium.Math.toDegrees(cartographic.latitude);
                // var lon3 = Cesium.Math.toDegrees(cartographic.longitude);
                // var hn  = cartographic.height
            }
            // if (pitch == -1.57 ){
            //     this.viewer.camera.flyTo({
            //     // fromDegrees()方法，将经纬度和高程转换为世界坐标
            //     destination:Cesium.Cartesian3.fromDegrees(lon3,lat3,hn), // 设置位置
            //     orientation:{
            //         // 指向
            //         heading:this.heading,
            //         // 视角
            //         pitch:Cesium.Math.toRadians(-60),
            //         roll:0.0
            //     },
            //     duration: 1, //设置飞行时间，默认会根据距离来计算
            //     })
            // }else{
            this.viewer.camera.flyTo({
                // fromDegrees()方法，将经纬度和高程转换为世界坐标
                destination:Cesium.Cartesian3.fromDegrees(lon1,lat1,h1), // 设置位置
                orientation:{
                    // 指向
                    //heading:this.heading,
                    // 视角
                    pitch:Cesium.Math.toRadians(-90),
                    roll:0.0
                },
                duration: 0.7, //设置飞行时间，默认会根据距离来计算
            })
            setTimeout(() => {
                //获取屏幕左上角和有下角经纬度
                let pt1 = new Cesium.Cartesian2(0,50);
                let pt2 = new Cesium.Cartesian2(this.viewer.canvas.clientWidth,this.viewer.canvas.clientHeight);
                
                let pick1 = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(pt1), this.viewer.scene);
                let pick2 = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(pt2), this.viewer.scene);
                
                //将三维坐标转成地理坐标
                let geoPt1 = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
                let geoPt2 = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(pick2);
                
                //地理坐标转换为经纬度坐标
                let point1=[geoPt1.longitude / Math.PI * 180,geoPt1.latitude / Math.PI * 180];           
                let point2=[geoPt2.longitude / Math.PI * 180,geoPt2.latitude / Math.PI * 180];
                //console.log(point1,point2)
                this.pointlocation.push(point1[0].toFixed(2))
                this.pointlocation.push(point1[1].toFixed(2))
                this.pointlocation.push(point2[0].toFixed(2))
                this.pointlocation.push(point2[1].toFixed(2))
                
                var s = document.getElementsByClassName('distance-legend-label')
                var s0 = s[0].outerText
                //console.log(s0)
                //console.log(s0.length)
                var s1,s2,s3
                s1 = parseInt(s0.substr(0,s0.length-2))
                //console.log(s1)
                s2 = s1*2
                //console.log(s2)
                s3 = s0.substr(s0.length-2,2)
                //console.log(s3)
                this.pointlocation.push(0)
                this.pointlocation.push(s1)
                this.pointlocation.push(s2)
                this.pointlocation.push(s3)
                
                //获取三断点经度
                var result1 = this.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(this.viewer.canvas.clientWidth / 3, this.viewer.canvas.clientHeight / 3));
                var result2 = this.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(this.viewer.canvas.clientWidth / 3 * 2, this.viewer.canvas.clientHeight / 3 * 2));
                var curPosition1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result1);
                var curPosition2 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result2);
                //屏幕中心点经纬度
                var long1 = curPosition1.longitude * 180 / Math.PI;
                var long2 = curPosition2.longitude * 180 / Math.PI;
                this.pointlocation.push(long1.toFixed(2))
                this.pointlocation.push(long2.toFixed(2))

            }, 1100);
            
        },

        //最小化
        minBtn(){
            this.PShow = !this.PShow
            this.SShow = !this.SShow
        },

        //最大化
        maxBtn(){
            this.SShow = !this.SShow
            this.PShow = !this.PShow
        },

        //截图模板生成
        Screenshot(){
            var odivBox1 = document.getElementById("tc4");
            odivBox1.style.cssText = "left:1768px;top:658px"


            this.dimension()
            setTimeout(() => {
                this.toImage()
            }, 1000);
            setTimeout(() => {
                var odivBox2 = document.getElementById("tc4");
                odivBox2.style.cssText = "left:10px;top:630px"
            }, 1200);
            this.TShow = !this.TShow
        },
        
        //截图方法
        toImage () {
             // let shareContent = document.body,//需要截图的包裹的（原生的）DOM 对象
            let shareContent = this.$refs.pdfop,
            width = shareContent.clientWidth, //获取dom 宽度
            height = shareContent.clientHeight, //获取dom 高度
            // width = shareContent.offsetWidth, //获取dom 宽度
            // height = shareContent.offsetHeight, //获取dom 高度
            canvas = document.createElement("canvas"), //创建一个canvas节点
            scale = 1; //定义任意放大倍数 支持小数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            canvas.style.width = shareContent.clientWidth * scale + "px";
            canvas.style.height = shareContent.clientHeight * scale + "px";
            canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
            let opts = {
                scale: scale, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                logging: false, //日志开关，便于查看html2canvas的内部执行流程
                width: width, //dom 原始宽度
                height: height,
                useCORS: true, // 【重要】开启跨域配置
                backgroundColor:true,
            }
            html2canvas(shareContent, opts).then(() => {
                var contentWidth = canvas.width;
                var contentHeight = canvas.height;
                //一页pdf显示html页面生成的canvas高度;
                // var pageHeight = (contentWidth / 592.28) * 841.89;
                var pageHeight = (contentWidth / 841.89) * 692.28;
                //未生成pdf的html页面高度
                var leftHeight = contentHeight;
                //页面偏移
                var position = 0;
                //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 841.89;
                var imgHeight = (841.89 / contentWidth) * contentHeight;
                var pageData = canvas.toDataURL("image/jpeg", 1.0);
                this.cutpicture = canvas.toDataURL("image/jpeg")
                /*var PDF = new JsPDF("l", "pt", "a4");
                if (leftHeight < pageHeight) {
                    PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
                } else {
                    while (leftHeight > 0) {
                        PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
                        leftHeight -= pageHeight;
                        position -= 692.28;
                        if (leftHeight > 0) {
                            PDF.addPage();
                        }
                    }
                }
                PDF.save("测试.pdf"); // 这里是导出的文件名*/
            }); 

            /* html2canvas(
                document.getElementById('Screen_shot'),{
                    background: '#ffffff', // 一定要添加背景颜色，否则出来的图片，背景全部都是透明的
                    dpi: 500,
                    //backgroundColor:true,//画出来的图片有白色的边框,不要可设置背景为透明色（null）
                    useCORS: true,//支持图片跨域
                    scale:0.5,//设置放大的倍数
                    allowTaint: true,
                }
            ).then(canvas => {
                this.cutpicture = canvas.toDataURL('image/jpeg');
            }) */
        },

        //罗盘
        campass(value){
            var options = {}
            // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和Cesium.Rectangle.
            //options.defaultResetView = this.Cesium.Cartographic.fromDegrees(115, 30, 2000000);
            // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
            if(value == 1){
                options.enableCompass = true;
            }
            if(value == 0){
                options.enableCompass = false;
            }
            
            // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件 将不会添加到地图中。
            options.enableZoomControls= false;
            // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
            options.enableDistanceLegend= true;
            // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
            options.enableCompassOuterRing= true;
            this.$CesiumNavigation(this.viewer, options);
        },

        //下载图片
        downloadImage() {
            /* html2canvas(
                document.getElementById('tc6'),
                {
                backgroundColor:true,//画出来的图片有白色的边框,不要可设置背景为透明色（null）
                useCORS: true,//支持图片跨域
                scale:1,//设置放大的倍数
                }
            ).then(canvas => {
                //截图用img元素承装，显示在页面的上
                let img = new Image();
                img.src = canvas.toDataURL('image/jpeg');// toDataURL :图片格式转成 base64
                //document.getElementById('tc7').appendChild(img);
                
                //如果你需要下载截图，可以使用a标签进行下载
                let a = document.createElement('a');
                a.href = img.src
                a.download = 'test';
                a.click();
            }) */ 
             // let shareContent = document.body,//需要截图的包裹的（原生的）DOM 对象
            let shareContent = this.$refs.pdfop1,
            width = shareContent.clientWidth, //获取dom 宽度
            height = shareContent.clientHeight, //获取dom 高度
            // width = shareContent.offsetWidth, //获取dom 宽度
            // height = shareContent.offsetHeight, //获取dom 高度
            canvas = document.createElement("canvas"), //创建一个canvas节点
            scale = 1; //定义任意放大倍数 支持小数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            canvas.style.width = shareContent.clientWidth * scale + "px";
            canvas.style.height = shareContent.clientHeight * scale + "px";
            canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
            let opts = {
                scale: scale, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                logging: false, //日志开关，便于查看html2canvas的内部执行流程
                width: width, //dom 原始宽度
                height: height,
                useCORS: true, // 【重要】开启跨域配置
                backgroundColor:true,
            }
            html2canvas(shareContent, opts).then(() => {
                var contentWidth = canvas.width;
                var contentHeight = canvas.height;
                //一页pdf显示html页面生成的canvas高度;
                // var pageHeight = (contentWidth / 592.28) * 841.89;
                var pageHeight = (contentWidth / 841.89) * 692.28;
                //未生成pdf的html页面高度
                var leftHeight = contentHeight;
                //页面偏移
                var position = 0;
                //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 841.89;
                var imgHeight = (841.89 / contentWidth) * contentHeight;
                var pageData = canvas.toDataURL("image/jpeg", 1.0);
                //this.cutpicture = canvas.toDataURL("image/jpeg")
                var PDF = new JsPDF("l", "pt", "a4");
                if (leftHeight < pageHeight) {
                    PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
                } else {
                    while (leftHeight > 0) {
                        PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
                        leftHeight -= pageHeight;
                        position -= 692.28;
                        if (leftHeight > 0) {
                            PDF.addPage();
                        }
                    }
                }
                PDF.save("test.pdf"); // 这里是导出的文件名*/
            }); 
        },

        //刷新散点图
        refresheacharts(){
            this.eachartsInit(this.seriesarr)
        },

        //散点图信息输出
        pointdata_output(){
            console.log(this.pointdata)
            console.log(this.seriesarr)
            var length = this.seriesarr.length
            var tableHeader = [ ['time'] ]
            var dataList = []
            if(length>1){
                var list1 = 'point1('+this.pointdata[0]+','+this.pointdata[2]+')'
                tableHeader[0].push(list1)
                for(var a = 0; a < 108; a++){
                    dataList.push([this.seriesarr[0].data[a][0],this.seriesarr[0].data[a][1]]); 
                }
                if(length>3){
                    var list2 = 'point2('+this.pointdata[3]+','+this.pointdata[5]+')'
                    tableHeader[0].push(list2)
                    for(var b = 0; b < 108; b++){
                        dataList[b].push(this.seriesarr[2].data[b][1]); 
                    }
                    if(length>5){
                        var list3 = 'point3('+this.pointdata[6]+','+this.pointdata[8]+')'
                        tableHeader[0].push(list3)
                        for(var c = 0; c < 108; c++){
                            dataList[c].push(this.seriesarr[4].data[c][1]); 
                        }
                    }
                }
            }
            dataConversionUtil.dataToExcel('output_data', tableHeader, dataList)
        },

        //散点图图片输出
        pointpicture_output(){
            let shareContent = this.$refs.chart1,
            width = shareContent.clientWidth, //获取dom 宽度
            height = shareContent.clientHeight, //获取dom 高度
            // width = shareContent.offsetWidth, //获取dom 宽度
            // height = shareContent.offsetHeight, //获取dom 高度
            canvas = document.createElement("canvas"), //创建一个canvas节点
            scale = 1; //定义任意放大倍数 支持小数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            canvas.style.width = shareContent.clientWidth * scale + "px";
            canvas.style.height = shareContent.clientHeight * scale + "px";
            canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
            let opts = {
                scale: scale, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                logging: false, //日志开关，便于查看html2canvas的内部执行流程
                width: width, //dom 原始宽度
                height: height,
                useCORS: true, // 【重要】开启跨域配置
                backgroundColor:true,
            }
            html2canvas(shareContent, opts).then(() => {
                var contentWidth = canvas.width;
                var contentHeight = canvas.height;
                //一页pdf显示html页面生成的canvas高度;
                // var pageHeight = (contentWidth / 592.28) * 841.89;
                var pageHeight = (contentWidth / 841.89) * 692.28;
                //未生成pdf的html页面高度
                var leftHeight = contentHeight;
                //页面偏移
                var position = 0;
                //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 841.89;
                var imgHeight = (841.89 / contentWidth) * contentHeight;
                var pageData = canvas.toDataURL("image/jpeg", 1.0);
                //this.cutpicture = canvas.toDataURL("image/jpeg")
                var PDF = new JsPDF("l", "pt", "a4");
                if (leftHeight < pageHeight) {
                    PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
                } else {
                    while (leftHeight > 0) {
                        PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
                        leftHeight -= pageHeight;
                        position -= 692.28;
                        if (leftHeight > 0) {
                            PDF.addPage();
                        }
                    }
                }
                PDF.save("图表.pdf"); // 这里是导出的文件名*/
            }); 
        },

        //顶部导航栏显示和隐藏
        toolbarcontral(value){
            var obox_Btn = document.getElementById("top-avigation");
            var odivBox = document.getElementById("show_top-avigation");
            var odivBox1 = document.getElementById("toolbar");
            if(value){
                odivBox.style.cssText = "top: 50px;"
                obox_Btn.style.cssText = "height: 50px;"
                odivBox1.style.cssText = "display:block;"
                this.ShowArr[4] = false
            }else{
                odivBox.style.cssText = "top: 0px;"
                obox_Btn.style.cssText = "height: 0px;"
                odivBox1.style.cssText = "display:none;"
                this.ShowArr[4] = true
                /* obox_Btn.onmouseover = function () {
                    odivBox.style.cssText = "display: block;"
                }
                obox_Btn.onmouseout = function () {
                    odivBox.style.cssText = "display: block;"
                } */ 
            }
        },
        
        //测量工具
        measure(){
            var that = this
            var handler = new Cesium.ScreenSpaceEventHandler(that.viewer.canvas);
            handler.setInputAction(function (event) {
                var earthPosition = that.viewer.scene.pickPosition(event.position);
                if (Cesium.defined(earthPosition)) {
                    if (that.activePArr.length === 0) {
                        that.MovePoint = that.createPoint1(earthPosition);
                        that.activePArr.push(earthPosition);
                        var dynamicPositions = new Cesium.CallbackProperty(function () {
                            /* if (taht.drawingMode === 'polygon') {
                                return new Cesium.PolygonHierarchy(that.activePArr);
                            }  */
                            return that.activePArr;
                        }, false);
                        that.activePicture = that.drawShape(dynamicPositions); //绘制动态图
                    }
                    that.activePArr.push(earthPosition);
                    that.createPoint1(earthPosition);
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK); 
        
            //鼠标右键
            handler.setInputAction(function () {
                that.LastHuizhi();
                handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
                handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
                handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

            //鼠标移动
            handler.setInputAction(function (event) {
                if (Cesium.defined(that.MovePoint)) {
                    var newPosition = that.viewer.scene.pickPosition(event.endPosition);
                    if (Cesium.defined(newPosition)) {
                        that.MovePoint.position.setValue(newPosition);
                        that.activePArr.pop();
                        that.activePArr.push(newPosition);
                    }
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        },

        //绘制函数
        LastHuizhi() {
            this.activePArr.pop(); //去除最后一个动态点
            if (this.activePArr.length) {
                this.drawShape(this.activePArr); //绘制最终图
            }
            this.viewer.entities.remove(this.MovePoint); //去除动态点图形（当前鼠标点）
            this.viewer.entities.remove(this.activePicture); //去除动态图形
            this.MovePoint = undefined;
            this.activePicture = undefined;
            this.activePArr = [];
        },

        //点创建
        createPoint1(worldPosition) {
            var point = this.viewer.entities.add({
                position: worldPosition,
                point: {
                    color: Cesium.Color.fromCssColorString('#000000'),
                    pixelSize: 8,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    //outlineColor: Cesium.Color.fromCssColorString('#45b97c'), 边框颜色
                    //outlineWidth: 2, 边框宽度
                    show: true,// 是否显示
                    disableDepthTestDistance:50000
                },
            });
            return point;
        },

        //绘制动态图
        drawShape(positionData) {
            var shape;
            shape = this.viewer.entities.add({
                polyline: {
                    positions: positionData,
                    clampToGround: true,
                    width: 3
                }
            });
            console.log(positionData)
            return shape;
        },

        //关闭方法测试
        off(){
            console.log(1)
            this.start_readcsv = false
		}

        
    },
    mounted(){
        this.loadmap(),
        this.mouselocation(),
        this.addlayer(this.region),
        this.campass(this.compass_show)
        this.readcsv()
        //this.toolbarcontral(this.ShowArr[4])
    },

    watch: {
        region(){
            this.tlie.show = false
            this.addlayer(this.region)
        },
        checkList(){
            this.seriesarr = [] 
            var pointshow = this.checkList.includes("Point");
            var lineshow = this.checkList.includes("Line");
            var pointshow1 = this.checkList.includes("Point1");
            var pointshow2 = this.checkList.includes("Point2");
            var pointshow3 = this.checkList.includes("Point3");
            if(pointshow){
                if(pointshow1){
                    this.seriesarr.push(this.seriesarr_spare[0])
                }
                if(pointshow2){
                    this.seriesarr.push(this.seriesarr_spare[2])
                }
                if(pointshow3){
                    this.seriesarr.push(this.seriesarr_spare[4])
                }
            }
            if(lineshow){
                if(pointshow1){
                    this.seriesarr.push(this.seriesarr_spare[1])
                }
                if(pointshow2){
                    this.seriesarr.push(this.seriesarr_spare[3])
                }
                if(pointshow3){
                    this.seriesarr.push(this.seriesarr_spare[5])
                }
            }
            this.eachartsInit(this.seriesarr)
        },
        start_readcsv(){
            console.log(this.start_readcsv)
            this.readcsv()
        }
    },

    directives: {
        drag: {
            // 指令的定义
            bind: function (el) {
                let odiv = el;   //获取当前元素
                el.onmousedown = (e) => {
                    //算出鼠标相对元素的位置
                    let disX = e.clientX - odiv.offsetLeft;
                    let disY = e.clientY - odiv.offsetTop;

                    let left = '';
                    let top = '';
                    document.onmousemove = (e)=>{
                        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        left = (e.clientX - disX);
                        top = (e.clientY - disY);
                        var docWidth = document.body.clientWidth//网页可见宽
                        var docHeight = document.body.clientHeight//网页可见高
                        if(top>docHeight-550){//超下边界(键盘DIV长宽分别为 295px、210px)
                            top = docHeight-555
                        }
                        if(top<0){//超上边界
                            top=5
                        }
                        if(left>docWidth-650){//超右边界
                            left = docWidth-620
                        }
                        if(left<0){//超左边界
                            left=5
                        }
                        //绑定元素位置到positionX和positionY上面
                        //移动当前元素
                        odiv.style.left = left + 'px';
                        odiv.style.top = top + 'px';
                    };
                    document.onmouseup = (e) => {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
            }
    },

}
</script>
<style>
    @import  './../assets/css/index.css';
</style>



