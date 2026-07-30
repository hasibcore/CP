            return {-1, -1};
        }
        
        return {lb, ub - 1};
    }
};

        if (lb == nums.size() || nums[lb] != target) {
        
        int ub = upperBound(nums, target);
        int lb = lowerBound(nums, target);
    vector<int> searchRange(vector<int>& nums, int target) {
