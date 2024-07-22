<template>
    <div class="detail-wrapper">
        <div class="detail-header">
            <h4>Item Detailed Information</h4>
        </div>
        <div class="detail">
            <div class="flex-container">
                <a-list size="medium" class="column">
                    <a-list-item v-for="(item, index) in itemData.filter((_, i) => i % 2 === 0)" :key="index">
                        <div class="listItemContent">
                            <span class="listItemTitle">{{ item.title }}</span>
                            <span class="listItemDescription">{{ item.description }}</span>
                        </div>
                    </a-list-item>
                </a-list>
                <a-list size="medium" class="column">
                    <a-list-item v-for="(item, index) in itemData.filter((_, i) => i % 2 !== 0)" :key="index">
                        <div class="listItemContent">
                            <span class="listItemTitle">{{ item.title }}</span>
                            <span class="listItemDescription">{{ item.description }}</span>
                        </div>
                    </a-list-item>
                </a-list>
            </div>
        </div>
    </div>
</template>
  
<script>
import { UserOutlined } from '@ant-design/icons-vue';
import axios from 'axios';

export default {
    // props: [rowkey],
    // components: {
    //   UserOutlined,
    // },
    // setup(props, { emit }) {

    //   onMounted(async () => {
    //     const id = props.rowkey;
    //     const response = await axios.get(
    //       `https://swen90016.herokuapp.com/request/category/${id}`
    //     );

    //     // 你可能需要处理 response 中的数据，如：
    //     // console.log(response.data);
    //   });
    // },
    data() {
        return {
            itemData: [

            ],
        };
    },
    async created() {
        try {
            const itemID = this.$route.params.itemID;

            const backendData = await axios.get(`https://swen90016.herokuapp.com/request/item/${itemID}`);//访问/donor的时候会获取所有的id，我需要获得点击的特定的id
            console.log(backendData)
            this.formatDataFromBackend(backendData);
            this.donationItems = backendData.data;
            console.log(this.donationItems)
        } catch (error) {
            console.error(error);
        }
    },
    methods: {

        formatDataFromBackend(backendData) {
            const data = backendData.data;  // 访问 backendData.data 而不是 backendData

            // donorData的处理
            const itemData = [
                { title: 'Name:', description: data.name },
                { title: 'Total Number Of Item:', description: data.totalnumber },
                { title: 'Category of Item:', description: data.category.name },
                { title: 'Brand:', description: data.brand},
                { title: 'Size of Item:', description: data.size },
                { title: 'Expire Date:', description: data.expirydate },
                { title: 'Ingredients:', description: data.ingredients },
                { title: 'Allergen:', description: data.allergen },
                
            ];

            // 更新数据
            this.itemData = itemData;

        }


    },
};
</script>
  
<style scoped>


.listItemContent {
    display: flex;
}

.listItemTitle {
    margin-right: 5px;
    font-weight: bold;
    /* Make the list titles bold */
}

.detail {
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    padding: 20px;
    border: 2px solid black;
}

.flex-container {
    display: flex;
    justify-content: space-between;
}

.column {
    width: 50%;
}

.detail-wrapper {
    position: relative;
    margin-top: 100px;
    margin-left: 150px;
    width: 80%;
}

.detail-header {
    margin: 0;
    padding: 0 10px;
    position: absolute;
    top: -25px;
    left: 0;
    right: 0;
}

</style>
  
  