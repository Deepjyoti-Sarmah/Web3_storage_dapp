// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract FileStorage {
    //Event
    event FileUploaded(
        uint256 fileId,
        string fileHash,
        uint256 fileSize,
        string fileType,
        string fileName,
        uint256 uploadTime,
        address uploader
    );

    //File Struct
    struct File {
        uint256 fileId;
        string fileHash;
        uint256 fileSize;
        string fileType;
        string fileName;
        uint256 uploadTime;
        address uploader;
    }

    uint public fileCount = 0;
    mapping(address => File[]) public files;

    //Upload File function
    function uploadFile(
        string memory _fileHash,
        uint _fileSize, 
        string memory _fileType, 
        string memory _fileName) public {

        //Make sure the file hash exits
        require(bytes(_fileHash).length > 0);
        require(bytes(_fileType).length > 0);
        require(bytes(_fileName).length > 0);
        require(msg.sender != address(0));
        require(_fileSize > 0);

        fileCount++;

        files[msg.sender].push(File(
            fileCount, 
            _fileHash, 
            _fileSize, 
            _fileType, 
            _fileName, 
            block.timestamp,
            msg.sender));

        //Tigger an event 
        emit FileUploaded(
            fileCount,
            _fileHash,
            _fileSize,
            _fileType,
            _fileName,
            block.timestamp,
            msg.sender
        );

    }
}
