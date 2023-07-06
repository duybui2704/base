# FoodCourt
# I. Component base

## 1. Box, Circle, TouchSingle
- import from `@dvh-module/app-component`

## 2. Input, AreaInput
- import from `src/components`
- thay thế `<TextInput>`

## 3. Text
- import from `src/components`
- thay thế `Text`, thêm phông chữ

## 4. TouchRipple, OutlineButton, UnderlineButton
- import from `src/components`
- tương tự `<Button>` thêm hiệu ứng ripple, thay thế `<Button>` react-native

## 5. AlertProvider
- import from `@dvh-module/app-component`
- thay thế alert thư viện
- method: show, hide
    ``` javascript
        AlertProvider.show({
            title: 'Xin chao',
            content: ' xin chao',
            actions: [
                { text: 'xin chao 1', onPress: () => console.log('haha') },
                { text: 'xin chao 2' },
            ],
            cancelable: false,
        })
    ```

## 6. Thumb 
- import from `src/components`
- sử dụng `<FastImage>` hiển thị ảnh, thay thế `<Image>` react-native
- nếu đang load: hiển thị `Loading`, nếu lỗi hiển thị ảnh nền default, nếu load thành công hiển thị ảnh thật

## 7. Header
- import from `src/components`
- tạo header cho page
- chứa title, goBack(), renderRight() (nếu cần), ...

## 8. TextCurrency
- Component dùng chung để hiện thị số tiền với đơn vị đ

## 9. Các component, hàm dùng chung
- ButtonCustom: Dùng để design các button
- FooterSingleButton: Dùng để hiện bottom button với 1 action
- PackageCard
- formatNumberWithCurrency, formatNumberWithoutCurrency: dùng để format number có dấu chấm ngăn cách



# II. Common

## 1. isIphoneX
- import from `@dvh-module/native-common`
- Trả về device có phải là dạng iphoneX hay không

## 2. getOffset
- import from `@dvh-module/native-common`
- Trả về `statusBar` và `bottomSpace`

## 3. widthLize, heightLize, fontSizeLine
- import from `src/configs`
- tính toán lại kích thước theo device, ưu tiên dùng `widthLize` hơn `heightLize`

## 4. formatMoneyVnd, removeUndifined, removeVietnamese
- import from `@dvh-module/core`

## 5. validator, regex
- import from `@dvh-module/core`


# III. Api

## 1. createRequest
- import from `@dvh-module/core`
- chứa get, post, put, delete

## 2. debounce
- import from `@dvh-module/core`
- tránh việc gọi 1 func liên tục ( ví dụ request api liên tục)
- debounce: (func: (...arg: any[]) => void, wait: number, immediate?: boolean) => (...args: any[]) => void;


# IV. Configs

## 1. colors
- cách dùng
     ``` javascript
        import { useAppColors } from 'src/configs'
        ...

        const colors = useAppColors()
        ...

        <Box color={colors.red}>
    ```
- format colors
    ``` javascript
       // background color
        // #FFF5E9
        bg_FFF5E9: '#FFF5E9',
        ...
        // text
        // #E0E1E0
        text_E0E1E0: '#E0E1E0',
        ...
        // status color
        // format: h_color | rgb_r_g_b | rgba_r_g_b_a
        h_2E92FF: '#2E92FF',
        rgba_29_172_14_15: 'rgba(29, 172, 14, 0.15)',
        ...
    ```

## 2. I18n
- cách dùng
     ``` javascript
        import { useI18n } from '@dvh-module/app-component'
        ...

        const i18n = useI18n()
        ...
        
    ```
- format i18n
    ``` javascript

            labels: {
                name: 'tên',
            },
            placeholders: {},
            errors: {},
            messages: {},
            actions: {},
        
    ```

# V. Navigation

## 1.Stack

- cách tạo mới stack screen
    + tạo màn hình mới
    + khai báo tên trong `src/navigation/routes`
    + tạo `<Stack.Screen>` trong `src/navigation/MainStack`
- chuyển screen
        ``` javascript

            onPress={() => navigation.navigate(routes_name)}
            onPress={() => navigation.push(routes_name, {params})}
        
        ```
- lấy param
    ``` javascript

        const { itemId , otherParam} = route.params
        
    ```
  

# VI. Icon

- import from `src/assets/icons/`
- sử dụng ảnh svg trong các folder tương ứng: action, arrow, ...

# VII. Commit Lint
- commit theo đúng định dạng, nếu không đúng định dạng sẽ báo lỗi
- format cơ bản
        type(scope?): subject   
        #scope là optional;
- ví dụ: 
    git commit -m 'chore: run tests on travis ci'
    git commit -m 'fix(server): send cors headers'
    git commit -m 'feat(blog): add comment section'
- type cơ bản: 
    + build : build
    + chore : việc vặt
    + docs : tài liệu
    + feat : tính năng
    + fix : fix 
    + perf : hoàn thành
    + refactor : cấu trúc lại
    + revert : hoàn lại
    + style : style
    + test : test
    + add : thêm

# VIII. Define Name
- Đặt tên biến đúng với kiểu dữ liệu, List thì chỉ chuyển list vào, Object thì chỉ chuyển Object vào....
- Đặt tên một biết Array hạn chế sử dụng tiền tốt list: vì dụ ListItem => Items.
- Đặt tên hàm call api = có tiền tố api* . Ví dụ: apiGetDetail()
- Đặt tên icon: Icon + tên icon. Ví dụ: IconAdd. Tên icon đặt giống trên figma, trường hợp trên figma không có tên mới tự định nghĩa tên.
#base-app
