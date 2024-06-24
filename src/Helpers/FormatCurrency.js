// Ví dụ: FormatCurrency.js
export function formatCurrency(value) {
    if (value === undefined || value === null) {
        // Xử lý trường hợp giá trị undefined hoặc null, có thể trả về một giá trị mặc định hoặc ném ra một lỗi
        return 'Giá trị không hợp lệ';
    }

    return value.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
}
