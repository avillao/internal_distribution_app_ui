import { useState } from 'react';

export const useToast = () => {
    const [showToast, setShowToast] = useState(false);

    return {
        showToast,
        setShowToast
    }
    
} 