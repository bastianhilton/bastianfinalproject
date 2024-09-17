<template>
    <div>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="card col-12 col-lg-3 col-md-6 col-sm-6">
                    <div class="card_wrapper">
                        <div class="card-box">
                            <div class="icon_block">
                                <div class="iconfont-wrapper">
                                    <span class="mbr-iconfont mobi-mbri-cart-full mobi-mbri"></span>
                                </div>
                            </div>
                            <p class="card-text mbr-fonts-style display-4">Code:
                                {{ item?.sharing_code }}</p>
                            <p class="card-text mbr-fonts-style display-4"># of Items:
                                {{ item?.items_count }}</p>
                            <p class="card-text mbr-fonts-style display-4">Wishlist #: {{ item?.id }}
                            </p>
                            <p class="card-text mbr-fonts-style display-4">Updated At:
                                {{ item?.updated_at }}</p>
                            <p class="btn_link mbr-fonts-style display-4"><a :href="`/commerce/lists/${item?.id}`"
                                    class="text-secondary">View<span
                                        class="mobi-mbri mobi-mbri-right mbr-iconfont"></span></a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        list: {
            type: Object,
            required: true,
        },
    });
    const {
        list
    } = props;
</script>