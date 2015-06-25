﻿/* area.service.js */

/**
* @desc all actions with site area
*/

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}


(function () {
    'use strict';

    angular
        .module('webvellaAdmin')
        .service('webvellaAdminService', service);

    service.$inject = ['$log', '$http', 'wvAppConstants'];



    /* @ngInject */
    function service($log, $http, wvAppConstants) {
        var serviceInstance = this;

        //#region << Include functions >>
        serviceInstance.getMetaEntityList = getMetaEntityList;
        serviceInstance.initEntity = initEntity;
        serviceInstance.createEntity = createEntity;
        serviceInstance.patchEntity = patchEntity;
        serviceInstance.getEntityMeta = getEntityMeta;
        serviceInstance.deleteEntity = deleteEntity;
        serviceInstance.initField = initField;
        serviceInstance.createField = createField;
        serviceInstance.updateField = updateField;
        serviceInstance.deleteField = deleteField;
        serviceInstance.initRelation = initRelation;
        serviceInstance.getRelationsList = getRelationsList;
        serviceInstance.createRelation = createRelation;
        serviceInstance.updateRelation = updateRelation;
        serviceInstance.deleteRelation = deleteRelation;

        serviceInstance.sampleView = sampleView;
        serviceInstance.initView = initView;
        serviceInstance.initViewSection = initViewSection;
        serviceInstance.initViewRow = initViewRow;
        serviceInstance.initViewRowColumn = initViewRowColumn;
        serviceInstance.getEntityView = getEntityView;
        serviceInstance.updateEntityView = updateEntityView;
        serviceInstance.safeAddArrayPlace = safeAddArrayPlace;
        serviceInstance.safeUpdateArrayPlace = safeUpdateArrayPlace;
        serviceInstance.safeRemoveArrayPlace = safeRemoveArrayPlace;
        serviceInstance.getEntityViewList = getEntityViewList;
        serviceInstance.getEntityViewLibrary = getEntityViewLibrary;

        serviceInstance.initList = initList;
        serviceInstance.getEntityListsList = getEntityListsList;
        serviceInstance.getEntityRecordsList = getEntityRecordsList;
        //Record
        serviceInstance.getRecordsByEntityName = getRecordsByEntityName;
        serviceInstance.createRecord = createRecord;
        serviceInstance.updateRecord = updateRecord;
        serviceInstance.patchRecord = patchRecord;

        //Area
        serviceInstance.deleteArea = deleteArea;
        serviceInstance.getAreaRelationByEntityId = getAreaRelationByEntityId;
        serviceInstance.createAreaEntityRelation = createAreaEntityRelation;
        serviceInstance.removeAreaEntityRelation = removeAreaEntityRelation;

        //#endregion

        //#region << Aux methods >>

        // Global functions for result handling for all methods of this service
        function handleErrorResult(data, status, errorCallback) {
            switch (status) {
                case 400:
                    if (errorCallback === undefined || typeof (errorCallback) != "function") {
                        $log.debug('webvellaAdmin>providers>admin.service> result failure: errorCallback not a function or missing ');
                        alert("The errorCallback argument is not a function or missing");
                        return;
                    }
                    data.success = false;
                    errorCallback(data);
                    break;
                default:
                    $log.debug('webvellaAdmin>providers>admin.service> result failure: API call finished with error: ' + status);
                    alert("An API call finished with error: " + status);
                    break;
            }
        }

        function handleSuccessResult(data, status, successCallback, errorCallback) {
            if (successCallback === undefined || typeof (successCallback) != "function") {
                $log.debug('webvellaAdmin>providers>admin.service> result failure: successCallback not a function or missing ');
                alert("The successCallback argument is not a function or missing");
                return;
            }

            if (!data.success) {
                //when the validation errors occurred
                if (errorCallback === undefined || typeof (errorCallback) != "function") {
                    $log.debug('webvellaAdmin>providers>admin.service> result failure: errorCallback not a function or missing ');
                    alert("The errorCallback argument in handleSuccessResult is not a function or missing");
                    return;
                }
                errorCallback(data);
            }
            else {
                $log.debug('webvellaAdmin>providers>admin.service> result success: get object ');
                successCallback(data);
            }
        }
        //#endregion

        //#region << Entity >>

        ///////////////////////
        function getMetaEntityList(successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>getMetaEntityList> function called');
            $http({ method: 'GET', url: wvAppConstants.apiBaseUrl + 'meta/entity/list' }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        ///////////////////////
        function initEntity() {
            $log.debug('webvellaAdmin>providers>admin.service>initEntity> function called');
            var entity = {
                id: null,
                name: "",
                label: "",
                labelPlural: "",
                system: false,
                iconName: "database",
                weight: 1.0,
                recordPermissions: {
                    canRead: [],
                    canCreate: [],
                    canUpdate: [],
                    canDelete: []
                }
            };
            return entity;
        }


        ///////////////////////
        function createEntity(postObject, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>createEntity> function called');
            $http({ method: 'POST', url: wvAppConstants.apiBaseUrl + 'meta/entity', data: postObject }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        ///////////////////////
        function getEntityMeta(name, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>getEntityMeta> function called');
            $http({ method: 'GET', url: wvAppConstants.apiBaseUrl + 'meta/entity/' + name }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        ///////////////////////
        function patchEntity(entityId, patchObject, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>patchEntity> function called');
            $http({ method: 'PATCH', url: wvAppConstants.apiBaseUrl + 'meta/entity/' + entityId, data: patchObject }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }


        ///////////////////////
        function deleteEntity(entityId, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>deleteEntity> function called');
            $http({ method: 'DELETE', url: wvAppConstants.apiBaseUrl + 'meta/entity/' + entityId }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }



        //#endregion << Entity >>

        //#region << Field >>


        ///////////////////////
        function initField(typeId) {
            $log.debug('webvellaAdmin>providers>admin.service>initField> function called');
            var field = {
                id: null,
                name: "",
                label: "",
                placeholderText: "",
                description: "",
                helpText: "",
                required: false,
                unique: false,
                searchable: false,
                auditable: false,
                system: false,
                fieldType: typeId,
            };

            switch (typeId) {
                case 1:
                    field.defaultValue = null;
                    field.startingNumber = 1;
                    field.displayFormat = null;
                    break;
                case 2:
                    field.defaultValue = false;
                    break;
                case 3:
                    field.defaultValue = null;
                    field.minValue = null;
                    field.maxValue = null;
                    field.currency = {
                        currencySymbol: null,
                        currencyName: null,
                        position: 0
                    };
                    break;
                case 4:
                    field.defaultValue = null;
                    field.format = null;
                    field.useCurrentTimeAsDefaultValue = false;
                    break;
                case 5:
                    field.defaultValue = null;
                    field.format = null;
                    field.useCurrentTimeAsDefaultValue = false;
                    break;
                case 6:
                    field.defaultValue = null;
                    field.maxLength = null;
                    break;
                case 7:
                    field.defaultValue = null;
                    break;
                case 8:
                    field.defaultValue = null;
                    break;
                case 9:
                    field.defaultValue = null;
                    break;
                case 10:
                    field.defaultValue = null;
                    field.maxLength = null;
                    field.visibleLineNumber = false;
                    break;
                case 11:
                    field.defaultValue = null;
                    field.options = null;
                    break;
                case 12:
                    field.defaultValue = null;
                    field.minValue = null;
                    field.maxValue = null;
                    field.decimalPlaces = 2;
                    break;
                case 13:
                    field.maxLength = null;
                    field.encrypted = true;
                    field.maskType = 1;
                    break;
                case 14:
                    field.defaultValue = null;
                    field.minValue = null;
                    field.maxValue = null;
                    field.decimalPlaces = 2;
                    break;
                case 15:
                    field.defaultValue = null;
                    field.format = null;
                    field.maxLength = null;
                    break;
                case 16:
                    field.defaultValue = null;
                    field.generateNewId = false;
                    break;
                case 17:
                    field.defaultValue = null;
                    field.options = null;
                    break;
                case 18:
                    field.defaultValue = null;
                    field.maxLength = null;
                    break;
                case 19:
                    field.defaultValue = null;
                    field.maxLength = null;
                    field.openTargetInNewWindow = false;
                    break;
                default:
                    break;
            }

            return field;
        }


        ///////////////////////
        function createField(postObject, entityId, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>createField> function called');
            $http({ method: 'POST', url: wvAppConstants.apiBaseUrl + 'meta/entity/' + entityId + '/field', data: postObject }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        ///////////////////////
        function updateField(putObject, entityId, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>updateField> function called');
            $http({ method: 'PUT', url: wvAppConstants.apiBaseUrl + 'meta/entity/' + entityId + '/field/' + putObject.id, data: putObject }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        ///////////////////////
        function deleteField(fieldId, entityId, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>updateField> function called');
            $http({ method: 'DELETE', url: wvAppConstants.apiBaseUrl + 'meta/entity/' + entityId + '/field/' + fieldId }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        //#endregion

        //#region << Relations  >>

        ///////////////////////
        function initRelation() {
            $log.debug('webvellaAdmin>providers>admin.service>initRelation> function called');
            var relation = {
                id: null,
                name: "",
                label: "",
                description: "",
                system: false,
                relationType: 1,
                originEntityId: null,
                originFieldId: null,
                targetEntityId: null,
                targetFieldId: null,

            };
            return relation;
        }


        ///////////////////////
        function getRelationsList(successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>getRelationsList> function called');
            $http({ method: 'GET', url: wvAppConstants.apiBaseUrl + 'meta/relation/list' }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        ///////////////////////
        function createRelation(postObject, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>createRelation> function called');
            $http({ method: 'POST', url: wvAppConstants.apiBaseUrl + 'meta/relation', data: postObject }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        ///////////////////////
        function updateRelation(postObject, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>updateRelation> function called');
            $http({ method: 'PUT', url: wvAppConstants.apiBaseUrl + 'meta/relation/' + postObject.id, data: postObject }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        ///////////////////////
        function deleteRelation(relationId, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>updateRelation> function called');
            $http({ method: 'DELETE', url: wvAppConstants.apiBaseUrl + 'meta/relation/' + relationId }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        //#endregion

        //#region << Entity Views >>
        ///////////////////////
        function sampleView() {
            $log.debug('webvellaAdmin>providers>admin.service>initView> function called');
            var view = {
            	"id": "7937a4a3-e074-4e2f-aca2-1467a29bb433",
            	"name": "details",
            	"label": "Details",
            	"default": true,
            	"system": true,
            	"weight": 1,
            	"cssClass": "",
            	"type": "general",
                "regions": [
                    {
                    	"name": "content",
                    	"render": false,
                    	"cssClass": "",
                    	"sections": [
							 {
 								"id": "48818fa7-77b4-cedd-71e4-80e106038abf",
 								"name": "general",
 								"label": "General",
 								"cssClass": "",
 								"showLabel": true,
 								"collapsed": false,
 								"weight": 1,
 								"tabOrder": "left-right",
 								"rows": [
									{
										"id": "48818fa7-77b4-cedd-71e4-80e106038abf",
										"weight": 1,
										"columns": [
										{
											"gridColCount":12,
											"items": [
											{
                    							"_t": "RecordViewFieldItem",
                    							"fieldId": "48818fa7-77b4-cedd-71e4-80e106038abf",
                    							"type": "field",
                    							"fieldName": "username",
                    							"fieldLabel": "Username"
											}
											]
										}
										]
									}
 								]
							 }
						],
                    },
                    {
                    	"render": false,
                    	"cssClass": "",
                    	"lists": [
						  {
				  			"entityId": "48818fa7-77b4-cedd-71e4-80e106038abf",
				  			"listId": "48818fa7-77b4-cedd-71e4-80e106038abf",
				  			"relationId": "48818fa7-77b4-cedd-71e4-80e106038abf"
						  }
                    	]
                    }
                ],

            };
            return view;
        }
        ///////////////////////
        function initView() {
            $log.debug('webvellaAdmin>providers>admin.service>initView> function called');
            var view = {
            	"id": "60b9dfe5-6dc7-4445-9481-83a1655b9a60",
                "name": "details",
                "label": "Details",
                "default": false,
                "system": false,
                "weight": 1,
                "cssClass": "",
                "type": "general",
                "regions": [
                    {
                        "id": guid(),
                        "name": "content",
                        "sections": []
                    },
                    {
                        "id": guid(),
                        "name": "sidebar",
                        "sections": []
                    }
                ]
            };
            return view;
        }
        ////////////////////////
        function initViewSection() {
        	var section = {
				"id":guid(),
            	"name": "section",
            	"label": "Section",
            	"cssClass": "",
                "showLabel": true,
                "collapsed": false,
                "weight": 1,
                "tabOrder": "left-right",
                "rows": []
            }
            return section;
        }
        ///////////////////////
        function initViewRow(columnCount) {
        	var row = {
        		"id": guid(),
                "weight": 1,
                "columns": []
            }


            if (columnCount == 0 || columnCount == 5 || columnCount > 12 || (7 <= columnCount && columnCount <= 11)) {
                columnCount = 1;
            }

            for (var i = 0; i < columnCount; i++) {
                var column = {
                    "gridColCount": 12 / columnCount,
                    "items": []
                }
                row.columns.push(column);
            }


            return row;
        }
        ///////////////////////
        function initViewRowColumn(columnCount) {
            var column = {
                "gridColCount": 12 / columnCount,
                "items": []
            }

            return column;
        }
        //////////////////////
        function getEntityViewLibrary(viewName, entityName, successCallback, errorCallback) {
            //This function will call the getEntityViewList, loop through views and return the view data for now
            var object = {};
            //Test data
            object.items = [
            {
            	"_t": "RecordViewHtmlItem",
            	"type": "html",
            	"tag": "",
            	"content": "<h1>Title</h1>",
            },
            {
            	"_t": "RecordViewFieldItem",
            	"type": "field",
            	"fieldId": "48818fa7-77b4-cedd-71e4-80e106038333",
            	"fieldName": "id",
            	"fieldLabel": "Id"
            },
            {
            	"_t": "RecordViewFieldItem",
            	"type": "field",
            	"fieldId": "48818fa7-77b4-cedd-71e4-80e106038abf",
                "fieldName": "username",
                "fieldLabel": "Username"
            },
            {
            	"_t": "RecordViewFieldItem",
            	"type": "field",
            	"fieldId": "48818fa7-77b4-cedd-71e4-80e106038ab9",
            	"fieldName": "email",
            	"fieldLabel": "Email"
            },
            {
            	"_t": "RecordViewRelationFieldItem",
            	"type": "fieldFromRelation",
            	"relationId": "48818fa7-77b4-cedd-71e4-80e106038ab1",
            	"entityId": "48818fa7-77b4-cedd-71e4-80e106038ab2",
            	"entityName": "account",
            	"entityLabel": "Account",
            	"fieldId": "48818fa7-77b4-cedd-71e4-80e106038ab3",
            	"fieldName": "email",
				"fieldLabel": "Email"
            },
            {
            	"_t": "RecordViewViewItem",
            	"type": "view",
                "viewId": guid(),
                "viewName": "short-info",
                "viewLabel": "Short Info",
                "entityId": guid(),
                "entityName": "account",
                "entityLabel": "Account"
            },
            {
            	"_t": "RecordViewListItem",
            	"type": "list",
            	"listId": guid(),
            	"listName": "short-list",
            	"listLabel": "Short List",
            	"entityId": guid(),
            	"entityName": "account",
            	"entityLabelPlural": "Accounts"
            }
            ];
            var response = {};
            response.success = true;
            response.object = object;

            successCallback(response);
        }
        ///////////////////////
        function getEntityViewList(entityName, successCallback, errorCallback) {
            var list = [];
            var view = initView();
            //Test data
            view.id = "7937a4a3-e074-4e2f-aca2-1467a29bb433";
            view.name = "details";
            view.label = "Details";
            view.default = true;
            view.system = true;
            view.type = "general";

            list.push(view);
            var response = {};
            response.success = true;
            response.object = {};
            response.object.views = list;
            successCallback(response);
        }
        //////////////////////
        function getEntityView(viewName, entityName, successCallback, errorCallback) {
            //This function will call the getEntityViewList, loop through views and return the view data for now
        	var view = sampleView();

            var response = {};
            response.success = true;
            response.object = view;

            successCallback(response);
        }
        //////////////////////
        function updateEntityView(viewObj, entityName, successCallback, errorCallback) {
            //TODO - pending implementation
            var view = viewObj;
            var response = {};
            response.success = true;
            response.object = view;
            response.message = "entity view updated";

            successCallback(response);
        }
        ////////////////////
        function safeAddArrayPlace(newObject, array) {
            //If the place is empty or null give it a very high number which will be made correct later
        	if (newObject.weight === "" || newObject.weight === null) {
        		newObject.weight = 99999;
            }

            //Sort and Free a place
        	array.sort(function (a, b) { return parseFloat(a.weight) - parseFloat(b.weight) });
            for (var i = 0; i < array.length; i++) {
            	if (parseInt(array[i].weight) >= parseInt(newObject.weight)) {
            		array[i].weight = parseInt(array[i].weight) + 1;
                }
            }

            //Insert the element on its desired position
            array.splice(parseInt(newObject.weight) - 1, 0, newObject);

            //Fix possible gaps
            array.sort(function (a, b) { return parseFloat(a.weight) - parseFloat(b.weight) });
            for (var i = 0; i < array.length; i++) {
            	array[i].weight = i + 1;
            }

            return array;
        }
        /////////////////////
        function safeUpdateArrayPlace(updateObject, array) {
            //If the place is empty or null give it a very high number which will be made correct later
        	if (updateObject.weight === "" || updateObject.weight === null) {
            	updateObject.weight = 99999;
            }
            for (var i = 0; i < array.length; i++) {
                //If this is an element that has the same place as the newly updated one increment its place
            	if (parseInt(array[i].weight) >= parseInt(updateObject.weight) && array[i].id != updateObject.id) {
            		array[i].weight = parseInt(array[i].weight) + 1;
                }
                //Find the element and update it
                if (array[i].id == updateObject.id) {
                    array[i] = updateObject;
                }

            }
            //Sort again
            array.sort(function (a, b) { return parseFloat(a.weight) - parseFloat(b.weight) });
            //Recalculate the places to remove gaps
            for (var i = 0; i < array.length; i++) {
            	array[i].weight = i + 1;
            }

            return array;
        }
        /////////////////////
        function safeRemoveArrayPlace(array, id) {
        	var elementIndex = -1;
        	for (var i = 0; i < array.length; i++) {
        		if (array[i].id === id) {
        			elementIndex = i;
        		}
        	}
        	if (elementIndex != -1) {
        		array.splice(elementIndex, 1);
        	}
            //Sort again
            array.sort(function (a, b) { return parseFloat(a.weight) - parseFloat(b.weight) });
            //Recalculate the places to remove gaps
            for (var i = 0; i < array.length; i++) {
            	array[i].weight = i + 1;
            }
            return array;
        }

        //#endregion

        //#region <<Records List>>
        ///////////////////////
        function initList() {
            $log.debug('webvellaAdmin>providers>admin.service>initList> function called');
            var list =
{
    "id": guid(),
    "name": "",
    "label": "",
    "default": true,
    "system": false,
    "weight": 1,
    "type": "general",
    "cssClass": "",
    "recordsLimit": 10,
    "pageSize": 10,
    "columns": [],
    "query": null,
    "sorts": null
}
            return list;
        }

        function sampleList() {
            $log.debug('webvellaAdmin>providers>admin.service>initList> function called');
            var list = 
            {
            	"id": "7937a4a3-e074-4e2f-aca2-1467a29bb433",
				"name": "recent_orders",
				"label": "Recent Orders",
				"default": true,
				"system": true,
				"weight": 1,
				"type": "general",
				"cssClass": "",
				"recordsLimit": 100,
				"pageSize": 10,
				"columns": [
			{
				"_t": "RecordViewFieldItem",
            	"type": "field",
            	"fieldId": "48818fa7-77b4-cedd-71e4-80e106038333",
            	"fieldName": "id",
            	"fieldLabel": "Id"
			},
				{
					"_t": "RecordViewFieldItem",
					"type": "field",
					"fieldId": "48818fa7-77b4-cedd-71e4-80e106038abf",
					"fieldName": "username",
					"fieldLabel": "Username"
				},
							{
								"_t": "RecordViewRelationFieldItem",
								"type": "fieldFromRelation",
								"relationId": "48818fa7-77b4-cedd-71e4-80e106038ab1",
								"entityId": "48818fa7-77b4-cedd-71e4-80e106038ab2",
								"entityName": "account",
								"entityLabel": "Account",
								"fieldId": "48818fa7-77b4-cedd-71e4-80e106038ab3",
								"fieldName": "email",
								"fieldLabel": "Email"
							}],
				"query": {
					"queryType": "AND",
					"fieldName": "",
					"fieldValue": "",
					"subQueries": [
						{
							"queryType": "EQ",
							"fieldName": "username",
							"fieldValue": "mozart",
							"subQueries": []
						},
						{
							"queryType": "CONTAINS",
							"fieldName": "email",
							"fieldValue": "domain.com",
							"subQueries": []
						}
					]
				},
				"sorts": [
					{
						"fieldName": "username",
						"sortType": "Descending"
					}
				]
            }
            return list;
        }


        ///////////////////////
        function getEntityListsList(entityName, successCallback, errorCallback) {
            var lists = [];
            var list = sampleList();
            lists.push(list);
            var response = {};
            response.success = true;
            response.object = {};
            response.object.lists = list;
            successCallback(response);
        }

        ///////////////////////
        function getEntityRecordsList(listName, entityName, successCallback, errorCallback) {
            var list = sampleList();

            var response = {};
            response.success = true;
            response.object = list;

            successCallback(response);
        }

        //#endregion


        //#region << Records >>
        /////////////////////
        function initRecord() {
            var record = {};
            var meta = initView();
            record.meta = meta;
            record.data = {
                "fieldsMeta": null,
                "fieldsData": null
            };
            return record;
        }

        ///////////////////////
        function getRecordsByEntityName(entityName,successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>getRecordsByEntityName> function called');
            $http({ method: 'GET', url: wvAppConstants.apiBaseUrl + 'record/'+entityName+'/list' }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        ///////////////////////
        function createRecord(entityName,postObject, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>createRecord> function called');
            $http({ method: 'POST', url: wvAppConstants.apiBaseUrl + 'record/' + entityName, data: postObject }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        ///////////////////////
        function updateRecord(recordId, entityName, patchObject, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>updateRecord> function called');
            $http({ method: 'PUT', url: wvAppConstants.apiBaseUrl + 'record/' + entityName + '/' + recordId, data: patchObject }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        ///////////////////////
        function patchRecord(recordId, entityName, patchObject, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>patchRecord> function called');
            $http({ method: 'PATCH', url: wvAppConstants.apiBaseUrl + 'record/' + entityName + '/' + recordId, data: patchObject }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        //#endregion

        //#region << Area specific >>
        ///////////////////////
        function deleteArea(recordId, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>patchRecord> function called');
            $http({ method: 'DELETE', url: wvAppConstants.apiBaseUrl + 'area/' + recordId }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }
        ///////////////////////
        function getAreaRelationByEntityId(entityId, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>getEntityRelatedAreas> function called');
            $http({ method: 'GET', url: wvAppConstants.apiBaseUrl + 'area/relations/entity/' + entityId }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        ///////////////////////
        function createAreaEntityRelation(areaId, entityId, successCallback, errorCallback) {
            $log.debug('webvellaAdmin>providers>admin.service>createAreaEntityRelation> function called');
            $http({ method: 'POST', url: wvAppConstants.apiBaseUrl + 'area/' + areaId + '/entity/' + entityId +'/relation' }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

    	///////////////////////
        function removeAreaEntityRelation(areaId, entityId, successCallback, errorCallback) {
        	$log.debug('webvellaAdmin>providers>admin.service>removeAreaEntityRelation> function called');
        	$http({ method: 'DELETE', url: wvAppConstants.apiBaseUrl + 'area/' + areaId + '/entity/' + entityId + '/relation' }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        //#endregion


    }
})();