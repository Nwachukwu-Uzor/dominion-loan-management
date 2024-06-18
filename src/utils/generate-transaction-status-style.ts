const STATUS_STYLES: Record<string, string> = {
    FAILED: 'bg-red-500',
    DISABLED: 'bg-red-500',
    SUCCESSFUL: 'bg-green-500',
    ACTIVE: 'bg-green-500',
    PENDING: 'bg-yellow-500',
    DECLINED: 'bg-orange-500',
}

export const generateTransactionStatusStyle = (status: string) => {
    const styles = STATUS_STYLES[status.toUpperCase()] ?? ""

    return `px-1 text-white uppercase inline-block min-w-[100px] text-center py-1.5 rounded-full text-xs font-semibold ${styles}`
}