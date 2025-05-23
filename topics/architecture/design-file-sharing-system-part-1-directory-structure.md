---
title: "Design file-sharing system - part 1: directory structure"
description: This system aims to provide users with the ability to store, access, and share files directly on our website, similar to Google Drive. This system aims to enhance user convenience and collaboration by allowing seamless file management and sharing capabilities.
date: 2024-07-31
authors:
  - datphamcode295
tags:
  - file-management
  - file-system
  - directory-structure
redirect:
  - /s/WxaFvw
---

This system aims to provide users with the ability to store, access, and share files directly on our website, similar to Google Drive. This system aims to enhance user convenience and collaboration by allowing seamless file management and sharing capabilities.

![File Sharing System](assets/design-file-sharing-system_1.webp)

## Overview

This file storage and sharing system enables users to:

- **Upload and edit files:** Users can upload various types of files to their personal storage space on the website and edit them.
- **Share files:** Users can share files with specific individuals or groups(all workspace members), providing controlled access to their content.
- **Public file access:** Users can make certain files public, allowing guest users to view these files without requiring a login.
- **Password protection:** For added security, users can set passwords on files to restrict access and ensure that only authorized users can view the content.

This system is designed to be user-friendly and secure, ensuring that users can manage their files with ease while maintaining control over who can access their content.

## Data model

![Data model](assets/design-file-sharing-system_2.webp)

### Workspace

The workspace table contains basic information that is essential for understanding the context. It's important to know that a workspace is essentially a group of people working together towards common goals. These individuals may collaborate on various sharing resources.

### Asset

The Asset table is the primary storage for information about digital assets within the system. These assets could include various types of files, documents, or other digital content. This table stores essential metadata about each asset, including identifiers, timestamps, file details, ownership information, and organizational categorization (such as project and workspace associations).

### Main permission & sub permission

The Permissions table manages access control and authorization for various resources within the system, defining who has what level of access to different assets. This table stores comprehensive permission data, including roles, access levels, and the scope of permissions.

This data model ensures a flexible and comprehensive system for managing files and their public accessibility, providing the foundation for a robust file storage and sharing system.

## Handle file structure

### Problem

**Hierarchical File Listing**

- The challenge in representing and maintaining a folder-like structure for file organization
- Efficient methods for retrieving files at specific levels of the hierarchy

**File Operations Across Hierarchy**

- Complexity in moving files between different levels of the hierarchy
- Ensuring data integrity when relocating files with child elements
- Updating all relevant references and permissions when files are moved

### Solution

**Path Field in Asset Model**

The `path` field in the `Asset` model represents the hierarchical location of an asset within the storage system. It is formatted as a string of concatenated IDs separated by slashes, such as `"/6667c29bb49c9ccb61d4aefe/6667c324b49c9ccb61d4af04/6667d6e8b49c9ccb61d4af2d"`. The structure of this path is as follows:

- The first ID (`6667c29bb49c9ccb61d4aefe`) represents the `workspaceID`.
- The subsequent IDs represent the hierarchical directory structure leading to the current asset, with each ID corresponding to a parent directory (e.g., assetID level 1, assetID level 2).

**Performance Improvement**

Using the `path` field in this format allows for efficient retrieval and updates of asset locations. Since the entire hierarchy is encapsulated in a single string, operations like moving an asset to a different directory or renaming a directory can be performed with constant time complexity, O(1). This efficiency is achieved because:

1. **Direct access:** The path provides a direct reference to the asset's location, eliminating the need for recursive directory traversal.
2. **Simplified updates:** Updating the path of an asset or its parent directories only requires modifying the string, avoiding complex tree structure updates.

This approach significantly reduces the computational overhead and complexity associated with managing hierarchical file structures, ensuring swift and efficient operations.

## Conclusion

In this memo, I discuss the various requirements of the system, detailing what is necessary for its optimal performance. Additionally, I explain how I optimize the file structure to ensure efficient storage and retrieval of data. In the next part of this memo, I will continue the discussion by elaborating on how I handle permissions, manage file sharing, and set passwords to enhance the security and accessibility of the system. This comprehensive approach ensures that all aspects of system management are covered thoroughly.

[Continue to Part 2: Permission & Password](https://memo.d.foundation/playground/01_literature/design-file-sharing-system-part-2-permission-and-password/)
