            nums.push_back(nums2[j++]);

        int n = nums.size();

        if (n % 2 == 1)
            return nums[n / 2];

        return (nums[n / 2 - 1] + nums[n / 2]) / 2.0;
    }
};

